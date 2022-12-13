import type { IArticle } from "@/types/Article.type";
import type {
  IPaginationQueryOptions,
  IPaginationResponse,
} from "@/types/Pagination.type";
import type { IArticleReaction } from "@/types/Reaction.type";
import type { ICreateArticle } from "@/views/user/article/CreateArticleView.vue";
import { http } from "./http";

export enum ArticlesPropTypes {
  POPULAR = "popular",
  LATEST = "latest",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
  INFINITY = "infinity",
}
export interface IArticlesParams extends IPaginationQueryOptions {
  prop: ArticlesPropTypes;
}
interface IArticlesResponse {
  data: IArticle[];
  pagination: IPaginationResponse;
}

class ArticleDataService {
  async getAll(params: IArticlesParams): Promise<IArticlesResponse> {
    return await http.get("/articles", { params });
  }
  async getDetails(slug: string): Promise<IArticle> {
    return await http.get(`/articles/${slug}`);
  }
  async create(article: ICreateArticle): Promise<IArticle> {
    return await http.post("/articles", article);
  }
  async delete(id: number) {
    return await http.delete(`/articles/${id}`);
  }
  async reaction(data: IArticleReaction): Promise<{ count: number }> {
    return await http.post("/articles/reactions", data);
  }
}

export default new ArticleDataService();
