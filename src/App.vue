<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header class="flex p-3 border border-gray-100">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
    <div class="ml-2 flex items-center">
      <RouterLink to="/" class="delay-75 cursor-pointer rounded-md hover:bg-green-200">
        Home
      </RouterLink>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>
