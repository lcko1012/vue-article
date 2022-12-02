<script setup lang="ts">
const topItems = ["week", "month", "year", "infinity"];
</script>

<template>
  <div class="p-2 border rounded-lg border-blue-500 bg-white font-bold">
    <RouterLink
      to="/"
      class="p-2 rounded-lg hover:bg-slate-200 cursor-pointer flex"
    >
      <div class="w-10 text-center">
        <FontAwesomeIcon icon="fire" class="text-xl text-red-600" />
      </div>

      {{ $t("views.articles.popular") }}
    </RouterLink>

    <div>
      <div class="p-2 rounded-lg flex items-center justify-between">
        <div class="flex">
          <div class="w-10 text-center">
            <FontAwesomeIcon icon="ranking-star" class="text-xl w-8" />
          </div>

          {{ $t("views.articles.top") }}
        </div>

        <span>i</span>
      </div>

      <div class="pl-10 flex flex-col">
        <RouterLink
          v-for="(item, index) in topItems"
          :key="index"
          :to="'/top/' + item"
          class="p-2 hover:bg-slate-200 rounded-lg cursor-pointer"
        >
          {{ $t(`views.articles.${item}`) }}
        </RouterLink>
      </div>
    </div>

    <RouterLink
      to="/latest"
      class="p-2 rounded-lg hover:bg-slate-200 cursor-pointer flex"
    >
      <div class="w-10 text-center">
        <FontAwesomeIcon
          :icon="['far', 'clock']"
          class="text-xl text-blue-700"
        />
      </div>

      {{ $t("views.articles.latest") }}
    </RouterLink>
  </div>
</template>
