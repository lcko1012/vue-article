import type { IUser } from "./User.type";

export interface IArticle {
  id: number;
  title: string;
  slug: string;
  content?: string;
  isPublic: boolean;
  thumbnail: string;
  likeCount?: number;
  bookmarkCount?: number;
  commentCount?: number;
  createdAt?: string;
  author?: IUser;
  isBookmarked?: boolean;
  isLiked?: boolean;
}
