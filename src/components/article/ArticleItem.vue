<script setup lang="ts">
import type { IArticle } from '@/types/Article.type';

interface IProps {
  article: IArticle
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="bg-white shadow-sm border border-gray-200 rounded-lg max-w mb-5">
    <img class="rounded-t-lg" :src="props.article.thumbnail" alt=""/>
    <div class="p-3">
      <h1 class="text-gray-900 font-bold text-xl tracking-tight">{{props.article.title}}</h1>
    </div>
  </div>
</template>
