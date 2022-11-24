<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { Form, Field, type ValidationResult } from "vee-validate";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import ArticleDataService from "@/services/ArticleDataService";
import UploadDataService from "@/services/UploadDataService";
import MyUploadAdapter from "@/common/upload-adapter";
import BasicToolbar from "@/common/basic-ckeditor-toolbar";
import toast from "@/common/toast";
import router from "@/router";
import SpinnerIcon from "@/components/core/SpinnerIcon.vue";

export interface ICreateArticle {
  title: string;
  content: string;
  thumbnail: string;
  isPublic?: boolean;
}
function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}
const { locale, t } = useI18n();
const form = ref<typeof Form>();
const articleState: {
  articleInfor: ICreateArticle;
  isUploadingImg: boolean;
} = reactive({
  articleInfor: {
    title: "",
    content: "",
    thumbnail: "",
    isPublic: false,
  },
  isUploadingImg: false,
});
const editorState = reactive({
  editor: ClassicEditor,
  editorConfig: {
    toolbar: {
      items: BasicToolbar,
    },
    extraPlugins: [MyCustomUploadAdapterPlugin],
  },
});
const schema = {
  title: "required|minMaxLength:5,255",
  content: "required",
  thumbnail: "required|image|size:2000",
};

watch(
  () => locale.value,
  () => {
    form.value?.validate();
  }
);

const handleSubmit = async () => {
  const data = await ArticleDataService.create(articleState.articleInfor);
  if (data.isPublic) {
    toast.success(t("views.createArticle.success"));
    router.push(`/articles/${data.slug}`);
  }
  //is draft, will be implemented later
  else router.push("/");
};

const handleChangeThumbnail = async (
  event: Event,
  validateField: (field: string) => Promise<ValidationResult>,
  setFieldValue: (field: string, value: File) => void
) => {
  const temp = await validateField("thumbnail");
  if (!temp.valid) return;

  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  articleState.isUploadingImg = true;
  const file = input.files[0];

  try {
    const res = await UploadDataService.uploadImage(file);
    articleState.articleInfor.thumbnail = res.url;
    setFieldValue("thumbnail", file);
  } finally {
    articleState.isUploadingImg = false;
  }
};
</script>

<template>
  <div class="min-h-body p-10 bg-gray-100">
    <div class="bg-white rounded-lg p-4">
      <Form
        ref="form"
        @submit="handleSubmit"
        :validation-schema="schema"
        v-slot="{ errors, validateField, setFieldValue }"
        class="w-full grid grid-rows-1 gap-1 rounded-lg"
      >
        <div class="flex items-center">
          <img
            v-if="articleState.articleInfor.thumbnail"
            :src="articleState.articleInfor.thumbnail"
            class="rounded-lg w-48 h-28 object-cover mr-2"
          />
          <label class="p-2 border cursor-pointer rounded-lg">
            <div v-if="!articleState.isUploadingImg">
              <FontAwesomeIcon icon="upload" class="mr-2" />

              <Field
                type="file"
                name="thumbnail"
                accept="image/*"
                class="hidden"
                @change="
                  handleChangeThumbnail($event, validateField, setFieldValue)
                "
              />
              {{ $t("views.createArticle.thumbnail") }}
            </div>

            <SpinnerIcon v-else height="h-6" color="text-slate-300" />
          </label>
        </div>
        <span class="text-red-400">{{ errors.thumbnail }}</span>

        <label>{{ $t("views.createArticle.title") }}:</label>
        <Field
          type="text"
          name="title"
          v-model="articleState.articleInfor.title"
          class="border-gray-200 outline-0 text-gray-900 font-bold text-4xl"
          :placeholder="$t('views.createArticle.title_here')"
        />
        <span class="text-red-400">{{ errors.title }}</span>

        <label>{{ $t("views.createArticle.content") }}:</label>
        <Field
          type="text"
          name="content"
          v-model="articleState.articleInfor.content"
          v-slot="{ field }"
        >
          <div>
            <ckeditor
              :editor="editorState.editor"
              v-bind="field"
              :config="editorState.editorConfig"
            />
          </div>
        </Field>
        <span class="text-red-400">{{ errors.content }}</span>

        <div>
          <Field
            id="isPublic"
            type="checkbox"
            name="isPublic"
            v-model="articleState.articleInfor.isPublic"
            :value="true"
            :unchecked-value="false"
          />
          <label for="isPublic" class="ml-1 cursor-pointer">
            {{ $t("views.createArticle.public") }}
          </label>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg"
          >
            <FontAwesomeIcon icon="newspaper" class="mr-1" />
            {{ $t("views.createArticle.submit") }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style>
.ck {
  border-radius: 10px;
}
.ck-editor__editable {
  min-height: 500px;
  width: 100%;
}
</style>
