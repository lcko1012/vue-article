<script setup lang="ts">
import type { IArticle } from "@/types/Article.type";

interface IProps {
  article: IArticle;
}

const props = defineProps<IProps>();
</script>

<template>
  <div class="bg-white shadow-sm border border-gray-200 rounded-lg max-w mb-5">
    <img class="rounded-t-lg" :src="props.article.thumbnail" alt="" />
    <div class="p-3">
      <h1 class="text-gray-900 font-bold text-xl tracking-tight">
        {{ props.article.title }}
      </h1>

      <RouterLink
        :to="{ name: 'article_details', params: { slug: props.article.slug } }"
      >
        <button
          class="rounded-md bg-green-300 p-1 my-2 hover:bg-green-600 hover:text-white"
        >
          Read
        </button>
      </RouterLink>
    </div>
  </div>
</template>
