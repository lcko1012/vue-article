<script setup lang="ts">
defineProps({
  show: Boolean,
});
</script>

<template>
  <Transition enter-from-class="opacity-0" leave-to-class="opacity-0">
    <div
      v-if="show"
      class="fixed top-0 left-0 w-full h-full table transition z-50 bg-black-rgba"
    >
      <div class="table-cell align-middle">
        <div
          class="w-[300px] mx-auto p-[20px] bg-white transition rounded-lg border"
        >
          <div class="mt-0 text-red-500">
            <slot name="header" />
          </div>

          <div class="my-[20px]">
            <slot name="body" />
          </div>

          <div class="flex justify-end">
            <button
              class="p-1 bg-blue-500 mr-2 rounded-md text-white"
              @click="$emit('close')"
            >
              {{ $t("components.core.deleteConfirmModal.cancel") }}
            </button>
            <button
              class="p-1 bg-red-500 rounded-md text-white"
              @click="$emit('delete')"
            >
              {{ $t("components.core.deleteConfirmModal.delete") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
