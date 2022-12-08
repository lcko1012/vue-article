import type { IComment } from "@/types/Comment.type";
import type {
  IPaginationQueryOptions,
  IPaginationResponse,
} from "@/types/Pagination.type";
import { http } from "./http";

export interface ICommentsResponse {
  data: IComment[];
  pagination: IPaginationResponse;
}

class CommentDataService {
  async getAll(
    articleId: number,
    params: IPaginationQueryOptions
  ): Promise<ICommentsResponse> {
    return await http.get(`/comments/posts/${articleId}`, { params });
  }
}

export default new CommentDataService();
