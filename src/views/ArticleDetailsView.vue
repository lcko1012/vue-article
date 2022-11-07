<script setup lang="ts">
import ArticleDataService from "@/services/ArticleDataService";
import type { IArticle } from "@/types/Article.type";
import { reactive, watchEffect, ref } from "vue";
import { useRoute } from "vue-router";
import DeleteConfirmModal from "@/components/core/DeleteConfirmModal.vue";
import router from "@/router";
import toast from "@/common/toast";
import { useI18n } from "vue-i18n";

const route = useRoute();
const { t } = useI18n();
const articleState: { article: IArticle } = reactive({
  article: {
    id: 0,
    title: "",
    slug: "",
    content: "",
    isPublic: true,
    thumbnail: "",
  },
});
const showDeleteModal = ref(false);

watchEffect(async () => {
  if (route.params.slug)
    articleState.article = await ArticleDataService.getDetails(
      String(route.params.slug)
    );
});

const handleDelete = async () => {
  await ArticleDataService.delete(articleState.article.id);
  toast.success(t("views.articleDetails.delete_success"));
  router.push("/");
};
</script>

<template>
  <div class="px-12 py-12">
    <div
      class="bg-fixed rounded-t-lg w-full h-96 bg-center bg-cover bg-no-repeat"
      :style="{ backgroundImage: `url(${articleState.article.thumbnail})` }"
    />

    <div class="flex justify-end my-2">
      <button
        @click="showDeleteModal = true"
        class="rounded-full bg-red-500 px-3 py-2 text-white hover:bg-white hover:text-red-500 transition"
      >
        <FontAwesomeIcon icon="trash" />
      </button>
    </div>

    <DeleteConfirmModal
      :show="showDeleteModal"
      @close="showDeleteModal = false"
      @delete="handleDelete"
    >
      <template #header>
        <h3>{{ $t("views.articleDetails.delete_header") }}</h3>
      </template>

      <template #body>
        <h3>{{ $t("views.articleDetails.delete_text") }}</h3>
      </template>
    </DeleteConfirmModal>

    <h1 class="text-gray-900 font-bold text-4xl my-2">
      {{ articleState.article.title }}
    </h1>

    <p class="my-6 indent-8 tracking-wider">
      {{ articleState.article.content }}
    </p>
  </div>
</template>
