<script setup lang="ts">
import ArticlesMenu from "@/views/user/article/components/ArticlesMenu.vue";
</script>

<template>
  <div class="px-12 py-12 bg-gray-100 min-h-body">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-2">
        <div class="relative h-full">
          <div class="sticky top-[calc(var(--header-height))]">
            <ArticlesMenu />
          </div>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-10">
        <RouterView :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>
