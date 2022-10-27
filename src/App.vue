<script setup lang="ts">
import { RouterView } from "vue-router";
import { useI18n } from "vue-i18n";
import { SUPPORT_LOCALES } from "./i18n";
import { setLocale } from "@vee-validate/i18n";

const { locale, t } = useI18n();

const onChangeLocale = (event: Event) => {
  setLocale((event.target as HTMLSelectElement).value);
};
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
  </header>

  <main>
    <RouterView />
  </main>
</template>
