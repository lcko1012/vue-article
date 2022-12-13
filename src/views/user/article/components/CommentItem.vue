<script setup lang="ts">
import type { IComment } from "@/types/Comment.type";

const props = defineProps<{ comment: IComment }>();
</script>

<template>
  <div class="flex">
    <img
      :src="props.comment.user.avatarUrl"
      class="circle-avatar w-10 h-10 cursor-pointer"
    />

    <div class="flex-1 pl-2">
      <div class="border rounded-lg">
        <div
          class="px-3 ck-content"
          v-dompurify-html="props.comment.content"
        ></div>

        <div class="border-t-[1px] px-3 py-1 flex justify-between items-center">
          <div class="flex">
            <button
              class="mr-3 p-1 rounded-lg hover:bg-gray-100 text-slate-800"
            >
              <FontAwesomeIcon :icon="['far', 'heart']" />
              {{ $t("components.article.commentItem.like") }}:
            </button>

            <button class="p-1 rounded-lg hover:bg-gray-100 text-slate-800">
              <FontAwesomeIcon :icon="['far', 'comment']" />
              {{ $t("components.article.commentItem.reply") }}:
            </button>
          </div>

          <div
            class="text-slate-800 cursor-pointer hover:bg-slate-100 p-1 rounded-lg text-center w-8 h-fit"
          >
            <FontAwesomeIcon icon="ellipsis" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
