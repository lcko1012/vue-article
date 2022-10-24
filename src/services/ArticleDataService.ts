import type { IArticle } from "@/types/Article.type";
import { http } from "./http";

class ArticleDataService {
  async getAll(): Promise<IArticle[]>  {
    return await http.get("/articles");
  }
  async getDetails(id: number): Promise<IArticle> {
    return await http.get(`/articles/${id}`);
  }
}

export default new ArticleDataService()
