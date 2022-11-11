<script setup lang="ts">
import toast from "@/common/toast";
import UploadDataService from "@/services/UploadDataService";
import UserDataService from "@/services/UserDataService";
import type { IUser } from "@/types/User.type";
import { Form, Field, type ValidationResult } from "vee-validate";
import { onMounted, reactive, ref, watch } from "vue";
import SpinnerIcon from "@/components/core/SpinnerIcon.vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const inforState: {
  information: IUser;
  isUploadingImg: boolean;
  isLoadingSave: boolean;
} = reactive({
  information: {
    id: 0,
    email: "",
    username: "",
    name: "",
    avatarUrl: "",
    about: "",
  },
  isUploadingImg: false,
  isLoadingSave: false,
});
const updateForm = ref<typeof Form>();
const schema = {
  email: "required|email",
  avatarUrl: "image|size:2000",
};

onMounted(() => {
  getInformation();
});

watch(
  () => locale.value,
  () => {
    updateForm.value?.validate();
  }
);

const getInformation = async () => {
  inforState.information = await UserDataService.getProfile();
};

const handleSubmit = async () => {
  inforState.isLoadingSave = true;
  await UserDataService.updateProfile(inforState.information);
  toast.success(t("views.updateWrapper.updateInformation.success"));
  inforState.isLoadingSave = false;
};

const handleChangeAvatar = async (
  event: Event,
  validateField: (field: string) => Promise<ValidationResult>
) => {
  const temp = await validateField("avatarUrl");
  if (!temp.valid) return;

  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  inforState.isUploadingImg = true;
  const file = input.files[0];

  try {
    const res = await UploadDataService.uploadImage(file);
    inforState.information.avatarUrl = res.url;
  } finally {
    inforState.isUploadingImg = false;
  }
};
</script>

<template>
  <div class="bg-white rounded-lg p-5 w-full">
    <Form
      ref="updateForm"
      @submit="handleSubmit"
      :validation-schema="schema"
      v-slot="{ errors, validateField }"
      class="grid grid-cols-6 gap-3 items-center"
    >
      <label>{{ $t("views.updateWrapper.updateInformation.avatar") }}: </label>
      <div class="col-span-5 flex items-center">
        <img
          :src="inforState.information.avatarUrl"
          class="rounded-full w-28 h-28 object-cover mr-2"
        />

        <label class="p-2 border cursor-pointer rounded-lg flex items-center">
          <div v-if="!inforState.isUploadingImg">
            <FontAwesomeIcon icon="upload" class="mr-2" />

            <Field
              type="file"
              name="avatarUrl"
              accept="image/*"
              class="hidden"
              @change="handleChangeAvatar($event, validateField)"
            />
            {{ $t("views.updateWrapper.updateInformation.upload") }}
          </div>

          <SpinnerIcon v-else height="h-6" color="text-slate-300" />
        </label>
      </div>
      <span class="text-red-400 col-span-6">{{ errors.avatarUrl }}</span>

      <label>
        {{ $t("views.updateWrapper.updateInformation.username") }}:
      </label>
      <Field
        type="text"
        name="username"
        v-model="inforState.information.username"
        disabled
        class="col-span-5 p-2 outline-0 border rounded-lg"
      />
      <span class="text-red-400 col-span-6">{{ errors.username }}</span>

      <label>{{ $t("views.updateWrapper.updateInformation.email") }}: </label>
      <Field
        type="text"
        name="email"
        v-model="inforState.information.email"
        class="col-span-5 p-2 outline-0 border rounded-lg"
      />
      <span class="text-red-400 col-span-6">{{ errors.email }}</span>

      <label>{{ $t("views.updateWrapper.updateInformation.name") }}: </label>
      <Field
        type="text"
        name="name"
        v-model="inforState.information.name"
        class="col-span-5 p-2 outline-0 border rounded-lg"
      />
      <span class="text-red-400 col-span-6">{{ errors.name }}</span>

      <label>{{ $t("views.updateWrapper.updateInformation.about") }}: </label>
      <Field
        as="textarea"
        name="about"
        v-model="inforState.information.about"
        class="col-span-5 p-2 outline-0 border rounded-lg"
      />
      <span class="text-red-400 col-span-6">{{ errors.about }}</span>

      <button
        type="submit"
        class="p-2 bg-slate-700 text-white rounded-lg col-span-1 col-start-6"
        :disabled="inforState.isLoadingSave"
      >
        {{ $t("views.updateWrapper.updateInformation.save") }}
      </button>
    </Form>
  </div>
</template>
