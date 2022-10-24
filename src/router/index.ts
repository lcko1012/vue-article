import ArticlesView from "../views/ArticlesView.vue";
import { createRouter, createWebHistory } from "vue-router";
import ArticleDetailsView from "@/views/ArticleDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ArticlesView
    },
    {
      path: "/articles/:id",
      name: "article_details",
      component: ArticleDetailsView
    }
  ],
});

export default router;
