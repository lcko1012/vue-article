<script setup lang="ts">
import type { IArticle } from "@/types/Article.type";
import { convertToLocaleDateString } from "@/common/date-time";
import { computed } from "vue";
import { ArticleReactionTypes } from "@/types/Reaction.type";
import ArticleDataService from "@/services/ArticleDataService";

interface IProps {
  article: IArticle;
}

const props = defineProps<IProps>();

const handleBookmark = async () => {
  const data = {
    articleId: props.article.id,
    type: ArticleReactionTypes.BOOKMARK,
  };

  await ArticleDataService.reaction(data);
  // eslint-disable-next-line vue/no-mutating-props
  props.article.isBookmarked = !props.article.isBookmarked;
};

const showAuthorName = computed(() => {
  return props.article.author?.name || props.article.author?.username;
});
</script>

<template>
  <div
    class="bg-white shadow-sm border min-h-[450px] border-gray-200 rounded-lg max-w p-4 flex flex-col"
  >
    <div class="mb-2 flex items-center">
      <img :src="article.author?.avatarUrl" class="circle-avatar w-12 h-12" />

      <div class="ml-2">
        <p class="cursor-pointer font-bold">{{ showAuthorName }}</p>
        <p class="text-xs">
          {{
            $t("views.articleDetails.posted_on", {
              date: convertToLocaleDateString(props.article.createdAt),
            })
          }}
        </p>
      </div>
    </div>
    <RouterLink
      :to="{ name: 'article_details', params: { slug: props.article.slug } }"
    >
      <img
        class="rounded-lg h-[250px] w-full"
        :src="props.article.thumbnail"
        alt=""
      />
    </RouterLink>

    <div class="flex-grow my-2">
      <RouterLink
        :to="{ name: 'article_details', params: { slug: props.article.slug } }"
      >
        <h1 class="text-gray-900 font-bold text-xl tracking-tight">
          {{ props.article.title }}
        </h1>
      </RouterLink>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="flex items-center mr-10 flex-nowrap">
          <FontAwesomeIcon icon="heart" class="mr-1 text-red-500 text-xl" />
          <p class="inline whitespace-nowrap">
            {{
              $t(
                "components.article.articleItem.like",
                props.article.likeCount!
              )
            }}
          </p>
        </div>

        <div class="flex items-center">
          <FontAwesomeIcon icon="comment" class="mr-1 text-blue-500 text-xl" />
          <p class="whitespace-nowrap">
            {{
              $t(
                "components.article.articleItem.comment",
                props.article.commentCount!
              )
            }}
          </p>
        </div>
      </div>

      <div
        @click="handleBookmark"
        class="flex items-center p-2 rounded-md"
        :class="
          props.article.isBookmarked
            ? 'bg-blue-100 text-blue-700'
            : ' hover:text-blue-700 hover:bg-blue-100'
        "
      >
        <FontAwesomeIcon
          :icon="['far', 'bookmark']"
          class="cursor-pointer text-xl"
        />
      </div>
    </div>
  </div>
</template>
