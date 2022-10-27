<script setup lang="ts">
import { onMounted, reactive } from "vue";
import ArticleItem from "@/components/article/ArticleItem.vue";
import type { IArticle } from "@/types/Article.type";
import ArticleDataService from "@/services/ArticleDataService";

const articlesState: { articles: IArticle[] } = reactive({
  articles: [],
});

const getArticles = async () => {
  articlesState.articles = await ArticleDataService.getAll();
};

onMounted(() => {
  getArticles();
});
</script>

<template>
  <div class="px-12 py-12">
    <RouterLink to="/articles/create">
      <button class="p-2 mb-2 rounded-md bg-green-700 text-white">
        {{ $t("views.articles.create") }}
      </button>
    </RouterLink>

    <div class="grid grid-cols-4 gap-4">
      <ArticleItem
        v-for="article in articlesState.articles"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>
