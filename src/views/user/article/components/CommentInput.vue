<script setup lang="ts">
import { reactive } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { CommentToolbar } from "@/common/ckeditor/ckeditor-toolbar";
import { MyCustomUploadAdapterPlugin } from "@/common/ckeditor/MyCustomUploadAdapterPlugin";
import { useSocketComputed } from "@/composables/useSocketComputed";
import emitActions from "@/store/socket/emit-actions";

interface ICommentsState {
  content: string;
  isEditting: boolean;
}

const props = defineProps<{
  articleId: number;
}>();
const emits = defineEmits<{ (event: "handleDismiss"): void }>();

const { socket } = useSocketComputed();

const commentInputState = reactive<ICommentsState>({
  content: "",
  isEditting: false,
});
const editorState = reactive({
  editor: ClassicEditor,
  editorConfig: {
    toolbar: {
      items: CommentToolbar,
    },
    extraPlugins: [MyCustomUploadAdapterPlugin],
  },
});

const handleDismiss = () => {
  emits("handleDismiss");
};
const submit = () => {
  if (!commentInputState.content) return;

  socket.value.emit(emitActions.ADD_COMMENT, {
    content: commentInputState.content,
    articleId: props.articleId,
  });

  commentInputState.content = "";
};
</script>

<template>
  <div>
    <ckeditor
      :editor="editorState.editor"
      :config="editorState.editorConfig"
      v-model="commentInputState.content"
    />

    <div class="py-2">
      <button
        class="p-1 rounded-lg bg-blue-700 text-white font-bold mr-2"
        @click="submit"
      >
        {{ $t("components.article.commentInput.submit") }}
      </button>
      <button class="p-1 rounded-lg hover:bg-gray-100" @click="handleDismiss">
        {{ $t("components.article.commentInput.dismiss") }}
      </button>
    </div>
  </div>
</template>
