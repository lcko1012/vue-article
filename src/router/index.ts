import { createRouter, createWebHistory } from "vue-router";
import {
  Authenticated,
  Authorizated,
  IsAuthRoutes,
} from "./authentication-config";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/LayoutView.vue"),
      children: [
        {
          path: "/",
          name: "articles",
          component: () => import("@/views/ArticlesView.vue"),
        },
        {
          path: "/articles/create",
          name: "article_create",
          component: () => import("@/views/CreateArticleView.vue"),
          beforeEnter: Authenticated,
        },
        {
          path: "/articles/:slug",
          name: "article_details",
          component: () => import("@/views/ArticleDetailsView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("@/views/admin/LayoutView.vue"),
      beforeEnter: Authorizated,
      children: [
        {
          path: "dashboard",
          name: "admin_dashboard",
          component: () => import("@/views/admin/DashboardView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      beforeEnter: IsAuthRoutes,
    },
  ],
});

export default router;
