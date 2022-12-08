<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import { useI18n } from "vue-i18n";
import { setLocale } from "@vee-validate/i18n";

import { SUPPORT_LOCALES } from "@/i18n";
import { useAuthComputed } from "@/composables/useAuthComputed";

const { locale, t } = useI18n();
const { currentUser, isLogged, isAdmin } = useAuthComputed();

const isOpenDropdown = ref<boolean>(false);

const onChangeLocale = (event: Event) => {
  setLocale((event.target as HTMLSelectElement).value);
};

const handleCloseDropdown = () => (isOpenDropdown.value = false);

const userDropdownItems = [
  {
    name: "menu.update",
    link: "/update_profile/information",
    icon: "pen-to-square",
  },
];
</script>

<template>
  <header class="flex p-3 border border-gray-100">
    <div class="ml-2 flex items-center justify-between w-full">
      <RouterLink
        to="/"
        class="delay-75 cursor-pointer rounded-md !bg-blue-600 p-1 text-white font-bold"
      >
        {{ t("menu.home") }}
      </RouterLink>

      <div class="flex items-center">
        <RouterLink
          v-if="!isLogged"
          to="/login"
          class="delay-75 mr-2 rounded-md hover:bg-green-200"
        >
          {{ t("menu.login") }}
        </RouterLink>

        <div v-else class="flex items-center">
          <RouterLink
            to="/articles/create"
            class="!bg-blue-200 text-blue-700 rounded-lg p-2 border hover:!bg-blue-300"
          >
            <button>
              <FontAwesomeIcon icon="pen" class="mr-1" />
              {{ $t("views.articles.create") }}
            </button>
          </RouterLink>

          <div
            class="mr-2 px-2 rounded-md cursor-pointer relative"
            v-click-out="handleCloseDropdown"
          >
            <div
              class="flex items-center"
              @click="isOpenDropdown = !isOpenDropdown"
            >
              <img
                :src="currentUser.avatarUrl"
                class="rounded-full w-10 h-10 mr-2 object-cover"
              />
              <FontAwesomeIcon icon="caret-down" />
            </div>

            <div v-if="isOpenDropdown">
              <ul
                class="min-w-[200px] rounded-xl p-1 mt-2 bg-white right-[1px] absolute block border border-slate-400"
              >
                <RouterLink v-if="isAdmin" to="/admin/dashboard">
                  <li class="p-2 hover:bg-red-400 rounded-lg">
                    <FontAwesomeIcon icon="lock" class="mr-1" />
                    {{ t("menu.admin") }}
                  </li>
                </RouterLink>

                <RouterLink
                  v-for="(item, index) in userDropdownItems"
                  :to="item.link"
                  :key="index"
                  @click="handleCloseDropdown"
                >
                  <li class="p-2 hover:bg-slate-200 rounded-lg">
                    <FontAwesomeIcon :icon="item.icon" class="mr-2" />
                    {{ $t(item.name) }}
                  </li>
                </RouterLink>
              </ul>
            </div>
          </div>
        </div>

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
