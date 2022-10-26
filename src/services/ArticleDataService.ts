import type { IArticle } from "@/types/Article.type";
import { http } from "./http";

class ArticleDataService {
  async getAll(): Promise<IArticle[]> {
    return await http.get("/articles");
  }
  async getDetails(slug: string): Promise<IArticle> {
    return await http.get(`/articles/${slug}`);
  }
}

export default new ArticleDataService();
