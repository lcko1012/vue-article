import type { IArticle } from "@/types/Article.type";
import type { ICreateArticle } from "@/views/CreateArticleView.vue";
import { http } from "./http";

class ArticleDataService {
  async getAll(): Promise<IArticle[]> {
    return await http.get("/articles");
  }
  async getDetails(slug: string): Promise<IArticle> {
    return await http.get(`/articles/${slug}`);
  }
  async create(article: ICreateArticle) {
    return await http.post("/articles", article);
  }
  async delete(id: number) {
    return await http.delete(`/articles/${id}`);
  }
}

export default new ArticleDataService();
