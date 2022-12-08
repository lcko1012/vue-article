<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useLoading } from "vue-loading-overlay";

import type { IArticle } from "@/types/Article.type";
import type { IPaginationResponse } from "@/types/Pagination.type";
import ArticleItem from "@/views/user/article/components/ArticleItem.vue";
import ArticleDataService, {
  ArticlesPropTypes,
  type IArticlesParams,
} from "@/services/ArticleDataService";

const route = useRoute();
const loading = useLoading();

const checkTimeCondition = () => {
  switch (route.params.time) {
    case "week": {
      return ArticlesPropTypes.WEEK;
    }
    case "month": {
      return ArticlesPropTypes.MONTH;
    }
    case "year": {
      return ArticlesPropTypes.YEAR;
    }
    default: {
      return ArticlesPropTypes.INFINITY;
    }
  }
};

const findProp = () => {
  switch (route.name) {
    case "top_articles": {
      return checkTimeCondition();
    }
    case "latest_articles": {
      return ArticlesPropTypes.LATEST;
    }
    default: {
      return ArticlesPropTypes.POPULAR;
    }
  }
};

const articlesState: {
  articles: IArticle[];
  paginationResponse: IPaginationResponse;
  params: IArticlesParams;
  isLoading: boolean;
} = reactive({
  articles: [],
  paginationResponse: {
    count: 0,
    currentPage: 0,
    nextPage: 0,
    prevPage: 0,
    lastPage: 0,
  },
  params: {
    prop: findProp(),
    page: 1,
    take: 10,
  },
  isLoading: false,
});

onMounted(async () => {
  const loader = loading.show();
  await fetchArticles();
  loader.hide();
});

const fetchArticles = async () => {
  const res = await ArticleDataService.getAll(articlesState.params);
  articlesState.params.page = articlesState.params.page + 1;

  articlesState.articles.push(...res.data);
  articlesState.paginationResponse = res.pagination;
};

const handleInfinityScroll = (isVisible: boolean) => {
  if (!isVisible || !articlesState.paginationResponse.nextPage) return;

  fetchArticles();
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <ArticleItem
      v-for="article in articlesState.articles"
      :key="article.id"
      :article="article"
      class="col-span-1"
    />
    <div v-observe-visibility="handleInfinityScroll" />
  </div>
</template>
