<script setup lang="ts">
import ArticleDataService from "@/services/ArticleDataService";
import type { IArticle } from "@/types/Article.type";
import { reactive, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
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

watchEffect(async () => {
  articleState.article = await ArticleDataService.getDetails(
    String(route.params.slug)
  );
});
</script>

<template>
  <div class="px-12 py-12">
    <div
      class="bg-fixed rounded-t-lg w-full h-96 bg-center bg-cover bg-no-repeat"
      :style="{ backgroundImage: `url(${articleState.article.thumbnail})` }"
    />

    <h1 class="text-gray-900 font-bold text-4xl my-2">
      {{ articleState.article.title }}
    </h1>

    <p class="my-6 indent-8 tracking-wider">
      {{ articleState.article.content }}
    </p>
  </div>
</template>
