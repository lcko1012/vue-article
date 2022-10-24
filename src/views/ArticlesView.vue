<script setup lang="ts">
<<<<<<< HEAD
=======
import { http } from "@/services/http";
>>>>>>> P1_list articles and configaxios request
import { onMounted, reactive } from "vue";
import ArticleItem from "../components/article/ArticleItem.vue"
import type {IArticle} from "../types/Article.type"
import ArticleDataService from "../services/ArticleDataService"

const articlesState : {articles: IArticle[]} = reactive({
<<<<<<< HEAD
  articles: []
=======
  articles: [] as IArticle[]
>>>>>>> P1_list articles and configaxios request
});

const getArticles = async () => {
  articlesState.articles = await ArticleDataService.getAll();
}

onMounted(() => {
  getArticles();
});
</script>

<template>
  <div class="px-12 py-12">
    <div class="grid grid-cols-4 gap-4">
      <ArticleItem v-for="article in articlesState.articles" :key="article.id" :article="article"/>
    </div>
  </div>
</template>
