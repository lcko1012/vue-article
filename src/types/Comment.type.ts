import type { IUser } from "./User.type";

export interface IComment {
  id: number;
  content: string;
  articleId: number;
  userId: number;
  user: IUser;
  myComment: boolean;
  createdAt: number;
}
