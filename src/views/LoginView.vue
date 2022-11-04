<script setup lang="ts">
import router from "@/router";
import AuthDataService from "@/services/AuthDataService";
import type { IErrorResponse } from "@/types/Error.type";
import type { AxiosError } from "axios";
import { Form, Field } from "vee-validate";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import CookieService from "@/services/CookieService";
import { AuthenticationActionTypes } from "@/store/authentication/actions";
import { NamespaceTypes } from "@/store/contanst";

export interface ILogin {
  email: string;
  password: string;
}

const store = useStore();
const { locale } = useI18n();
const loginForm = ref<typeof Form>();
const isError = ref<boolean>(false);
const schema = {
  email: "required|email",
  password: "required|minMaxLength:8,32",
};

watch(
  () => locale.value,
  () => {
    loginForm.value?.validate();
  }
);

const handleSubmit = async (values: Record<string, unknown>) => {
  const data = values as ILogin & Record<string, unknown>;

  try {
    const res = await AuthDataService.login(data);

    store.dispatch(
      `${NamespaceTypes.AUTH}/${AuthenticationActionTypes.LOGIN}`,
      res.user
    );
    CookieService.setAccessToken(res.accessToken);
    router.push("/");
  } catch (err) {
    const error = err as AxiosError & IErrorResponse;
    if (error.status === 401) {
      isError.value = true;
    }
  }
};
</script>

<template>
  <div
    class="w-full h-screen flex justify-center items-center bg-no-repeat bg-cover bg-[url('@/assets/login_background.jpg')]"
  >
    <div class="p-5 rounded-md shadow-sm bg-opacity-30 bg-white">
      <Form
        ref="loginForm"
        @submit="handleSubmit"
        :validation-schema="schema"
        v-slot="{ errors }"
        class="w-[600px] grid grid-rows-1 gap-2 rounded-md"
      >
        <h1 class="text-center text-3xl mb-2 text-green-900">
          {{ $t("views.login.title") }}
        </h1>

        <label>{{ $t("views.login.email") }}:</label>
        <Field
          type="text"
          name="email"
          class="p-2 border-gray-200 border rounded-lg outline-0"
        />
        <span class="text-red-400">{{ errors.email }}</span>

        <label>{{ $t("views.login.password") }}:</label>

        <Field
          type="password"
          name="password"
          class="p-2 border-gray-200 border rounded-lg outline-0"
        />
        <span class="text-red-400">{{ errors.password }}</span>

        <button type="submit" class="p-2 bg-green-900 text-white rounded-lg">
          {{ $t("views.login.submit") }}
        </button>

        <span v-if="isError" class="text-red-400">
          {{ $t("views.login.failed") }}
        </span>
      </Form>
    </div>
  </div>
</template>
