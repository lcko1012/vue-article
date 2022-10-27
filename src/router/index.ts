import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/ArticlesView.vue"),
    },
    {
      path: "/articles/:slug",
      name: "article_details",
      component: () => import("@/views/ArticleDetailsView.vue"),
    },
    {
      path: "/articles/create",
      name: "article_create",
      component: () => import("@/views/CreateArticleView.vue"),
    },
  ],
});

export default router;
