<script setup lang="ts">
import { computed, reactive } from "vue";

import CommentItem from "./CommentItem.vue";
import CommentInput from "./CommentInput.vue";
import { CommentsGetterTypes } from "@/store/comments/getters";
import { store } from "@/store";
import { NamespaceTypes } from "@/store/contanst";
import { useAuthComputed } from "@/composables/useAuthComputed";
import toast from "@/common/toast";
import { i18n } from "@/i18n";

const props = defineProps<{
  articleId: number;
}>();

const { currentUser, isLogged } = useAuthComputed();

const commentsState = reactive({
  isEditting: false,
});

const handleClickComment = () => {
  if (!isLogged.value)
    return toast.error(i18n.global.t("errors.authentication"));
  commentsState.isEditting = true;
};
const handleCloseEditting = () => {
  commentsState.isEditting = false;
};

const comments = computed(() => {
  return store.getters[
    `${NamespaceTypes.COMMENTS}/${CommentsGetterTypes.GET_COMMENTS}`
  ];
});
</script>

<template>
  <div class="mb-6">
    <h1 class="text-2xl font-bold">
      {{ $t("components.article.commentsContainer.comments") }}:
    </h1>
  </div>

  <div>
    <div class="flex">
      <img
        :src="currentUser?.avatarUrl"
        class="circle-avatar w-10 h-10 cursor-pointer"
      />

      <div class="pl-2 w-full">
        <CommentInput
          v-if="commentsState.isEditting"
          :articleId="props.articleId"
          @handleDismiss="handleCloseEditting"
        />
        <input
          v-else
          placeholder="Type your comment"
          @click="handleClickComment"
          class="p-2 border rounded-lg outline-none w-full"
        />
      </div>
    </div>

    <div class="grid grid-rows-1 gap-4 py-5">
      <CommentItem
        v-for="comment in comments.data"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>
