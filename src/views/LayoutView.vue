<script setup lang="ts">
import { RouterView } from "vue-router";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES } from "@/i18n";
import { setLocale } from "@vee-validate/i18n";
import { useStore } from "vuex";
import { computed } from "vue";
import { NamespaceTypes } from "@/store/contanst";
import { AuthenticationGetterTypes } from "@/store/authentication/getters";

const store = useStore();
const { locale, t } = useI18n();

const onChangeLocale = (event: Event) => {
  setLocale((event.target as HTMLSelectElement).value);
};

const isLogged = computed(() => {
  return store.getters[
    `${NamespaceTypes.AUTH}/${AuthenticationGetterTypes.GET_IS_LOGGED}`
  ];
});
const user = computed(() => {
  return store.getters[
    `${NamespaceTypes.AUTH}/${AuthenticationGetterTypes.GET_USER}`
  ];
});
const isAdmin = computed(() => {
  return store.getters[
    `${NamespaceTypes.AUTH}/${AuthenticationGetterTypes.GET_IS_ADMIN}`
  ];
});
</script>

<template>
  <header class="flex p-3 border border-gray-100">
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="50"
      height="50"
    />
    <div class="ml-2 flex items-center justify-between w-full">
      <RouterLink
        to="/"
        class="delay-75 cursor-pointer rounded-md hover:bg-green-200"
      >
        {{ t("menu.home") }}
      </RouterLink>

      <div class="flex">
        <RouterLink
          v-if="!isLogged"
          to="/login"
          class="delay-75 mr-2 rounded-md hover:bg-green-200"
        >
          {{ t("menu.login") }}
        </RouterLink>

        <div v-else class="mr-2 bg-green-100 px-2 rounded-md">
          {{ t("menu.greeting", { name: user?.name }) }}
        </div>

        <RouterLink
          v-if="isAdmin"
          to="/admin/dashboard"
          class="delay-75 mr-2 rounded-md hover:bg-red-300"
        >
          <FontAwesomeIcon icon="lock" class="mr-1" />
          {{ t("menu.admin") }}
        </RouterLink>

        <form>
          <label for="locale-select">{{ t("menu.language") }}</label>
          <select
            id="locale-select"
            v-model="locale"
            @change="onChangeLocale($event)"
            class="ml-2 rounded-md bg-slate-200"
          >
            <option
              v-for="availableLocale in SUPPORT_LOCALES"
              :key="availableLocale"
              :value="availableLocale"
            >
              {{ availableLocale }}
            </option>
          </select>
        </form>
      </div>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>
