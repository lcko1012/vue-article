<script setup lang="ts">
import { reactive, watchEffect, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { useLoading } from "vue-loading-overlay";

import type { IArticle } from "@/types/Article.type";
import { ArticleReactionTypes } from "@/types/Reaction.type";
import router from "@/router";
import ArticleDataService from "@/services/ArticleDataService";
import { NamespaceTypes } from "@/store/contanst";
import { AuthenticationGetterTypes } from "@/store/authentication/getters";
import { convertToLocaleDateString } from "@/common/date-time";
import toast from "@/common/toast";
import DeleteConfirmModal from "@/components/core/DeleteConfirmModal.vue";

const store = useStore();
const route = useRoute();
const { t } = useI18n();
const loading = useLoading();
const articleState: { article: IArticle } = reactive({
  article: {
    id: 0,
    title: "",
    slug: "",
    content: "",
    isPublic: true,
    thumbnail: "",
    likeCount: 0,
    bookmarkCount: 0,
    createdAt: "",
    author: {
      id: 0,
      username: "",
      name: "",
      avatarUrl: "",
      about: "",
      createdAt: "",
    },
    isLiked: false,
    isBookmarked: false,
  },
});
const showDeleteModal = ref(false);

watchEffect(async () => {
  if (route.params.slug) {
    const loader = loading.show();
    articleState.article = await ArticleDataService.getDetails(
      String(route.params.slug)
    );
    loader.hide();
  }
});

const handleDelete = async () => {
  await ArticleDataService.delete(articleState.article.id);
  toast.success(t("views.articleDetails.delete_success"));
  router.push("/");
};

const handleActionArticle = async (type: ArticleReactionTypes) => {
  const data = {
    articleId: articleState.article.id,
    type,
  };
  const { count } = await ArticleDataService.reaction(data);

  if (type === ArticleReactionTypes.BOOKMARK) {
    articleState.article.bookmarkCount = count;
    articleState.article.isBookmarked = !articleState.article.isBookmarked;
  } else if (type === ArticleReactionTypes.LIKE) {
    articleState.article.likeCount = count;
    articleState.article.isLiked = !articleState.article.isLiked;
  }
};

const showAuthorName = computed(() => {
  return (
    articleState.article.author?.name || articleState.article.author?.username
  );
});
const showAuthorAbout = computed(() => {
  return Boolean(articleState.article.author?.about);
});
const currentUser = computed(() => {
  return store.getters[
    `${NamespaceTypes.AUTH}/${AuthenticationGetterTypes.GET_USER}`
  ];
});
const isAuthor = computed(() => {
  return currentUser.value?.username === articleState.article.author?.username;
});
</script>

<template>
  <div class="px-12 py-10 bg-gray-100 min-h-body">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-1 flex justify-end">
        <div class="relative h-full">
          <div
            class="sticky top-[calc(50%-var(--header-height))] left-1/2 bg-blue-200 rounded-lg p-2"
          >
            <div class="grid grid-cols-1 gap-3 text-center">
              <div>
                <button
                  @click="handleActionArticle(ArticleReactionTypes.LIKE)"
                  class="delay-100 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
                  :class="
                    articleState.article.isLiked
                      ? 'bg-red-500 text-white'
                      : 'text-red-500 hover:bg-red-500 hover:text-white'
                  "
                >
                  <FontAwesomeIcon icon="heart" />
                </button>

                <span class="text-xs">
                  {{ articleState.article.likeCount }}
                </span>
              </div>

              <div>
                <button
                  @click="handleActionArticle(ArticleReactionTypes.BOOKMARK)"
                  class="rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
                  :class="
                    articleState.article.isBookmarked
                      ? 'bg-blue-500 text-white'
                      : 'text-blue-500 hover:bg-blue-500 hover:text-white'
                  "
                >
                  <FontAwesomeIcon icon="bookmark" />
                </button>
                <span class="text-xs">
                  {{ articleState.article.bookmarkCount }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-8 bg-white rounded-lg">
        <div
          class="rounded-t-lg w-full h-96 bg-center bg-cover bg-no-repeat"
          :style="{
            backgroundImage: `url(${articleState.article.thumbnail})`,
          }"
        />

        <div class="px-16 pt-10">
          <div class="flex items-center justify-between">
            <div class="flex">
              <img
                :src="articleState.article.author?.avatarUrl"
                class="circle-avatar w-10 h-10 mr-2 cursor-pointer"
              />
              <div>
                <p class="cursor-pointer">{{ showAuthorName }}</p>
                <p class="text-xs">
                  {{
                    $t("views.articleDetails.posted_on", {
                      date: convertToLocaleDateString(
                        articleState.article.createdAt
                      ),
                    })
                  }}
                </p>
              </div>
            </div>

            <div v-if="isAuthor" class="flex">
              <button
                @click="showDeleteModal = true"
                class="rounded-lg px-3 py-2 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition mr-2"
              >
                <FontAwesomeIcon icon="trash" />
              </button>

              <button
                class="rounded-lg px-3 py-2 text-blue-300 border border-blue-300 hover:bg-blue-500 hover:text-white transition"
              >
                <FontAwesomeIcon icon="pen" />
              </button>
            </div>
          </div>

          <h1 class="text-gray-900 font-bold text-4xl my-2">
            {{ articleState.article.title }}
          </h1>
        </div>

        <div class="px-16 py-6">
          <div
            class="tracking-wider ck-content"
            v-dompurify-html="articleState.article.content"
          />
        </div>
      </div>

      <div class="col-span-3">
        <div class="bg-white w-full p-3 grid grid-cols-1 gap-3 rounded-lg">
          <div class="flex items-center">
            <img
              :src="articleState.article.author?.avatarUrl"
              class="circle-avatar w-12 h-12 mr-2 cursor-pointer"
            />
            <p class="cursor-pointer">{{ showAuthorName }}</p>
          </div>

          <button
            class="p-2 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FontAwesomeIcon icon="user-plus" class="mr-2" />
            {{ $t("views.articleDetails.follow") }}
          </button>

          <div v-if="showAuthorAbout">
            <h3 class="font-bold">{{ $t("views.articleDetails.about") }}:</h3>
            <p>{{ articleState.article.author?.about }}</p>
          </div>

          <div>
            <h3 class="font-bold">{{ $t("views.articleDetails.joined") }}:</h3>
            <p>
              {{
                convertToLocaleDateString(
                  articleState.article.author?.createdAt
                )
              }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <DeleteConfirmModal
      :show="showDeleteModal"
      @close="showDeleteModal = false"
      @delete="handleDelete"
    >
      <template #header>
        <h3>{{ $t("views.articleDetails.delete_header") }}</h3>
      </template>

      <template #body>
        <h3>{{ $t("views.articleDetails.delete_text") }}</h3>
      </template>
    </DeleteConfirmModal>
  </div>
</template>
