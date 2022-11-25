import type { IArticle } from "@/types/Article.type";
import type { IArticleReaction } from "@/types/Reaction.type";
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
  async reaction(data: IArticleReaction): Promise<{ count: number }> {
    return await http.post("/articles/reactions", data);
  }
}

export default new ArticleDataService();
