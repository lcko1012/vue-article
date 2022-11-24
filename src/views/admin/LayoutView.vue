<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

import { AuthenticationGetterTypes } from "@/store/authentication/getters";
import { NamespaceTypes } from "@/store/contanst";

const store = useStore();

const user = computed(() => {
  return store.getters[
    `${NamespaceTypes.AUTH}/${AuthenticationGetterTypes.GET_USER}`
  ];
});
</script>

<template>
  <div class="grid grid-cols-12 bg-slate-100">
    <div class="col-span-2">
      <div class="px-2 rounded-r-3xl h-screen bg-white">
        <div class="px-10 py-2 flex items-center border-b-[1px]">
          <img :src="user.avatarUrl" class="rounded-full w-12 h-12" />

          <div class="text-center w-full">
            <p>{{ user.name }}</p>
          </div>
        </div>

        <div class="grid grid-rows-1 py-4 gap-2">
          <div
            class="p-2 hover:bg-slate-100 cursor-pointer transition delay-50 rounded-lg"
          >
            <FontAwesomeIcon icon="grip-horizontal" class="mr-1" />
            {{ $t("admin.menu.dashboard") }}
          </div>

          <RouterLink
            to="/"
            class="p-2 hover:bg-slate-100 cursor-pointer transition delay-50 rounded-lg"
          >
            <FontAwesomeIcon icon="home-user" class="mr-1" />
            {{ $t("admin.menu.homepage") }}
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="col-span-10">
      <RouterView />
    </div>
  </div>
</template>
