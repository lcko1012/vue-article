export enum ArticleReactionTypes {
  LIKE = "like",
  BOOKMARK = "bookmark",
}

export interface IArticleReaction {
  articleId: number;
  type: ArticleReactionTypes;
}
