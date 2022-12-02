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
          component: () =>
            import("@/views/user/article/ArticlesWrapperView.vue"),
          children: [
            {
              path: "/",
              name: "popular_articles",
              component: () => import("@/views/user/article/ArticlesView.vue"),
            },
            {
              path: "top/:time",
              name: "top_articles",
              component: () => import("@/views/user/article/ArticlesView.vue"),
            },
            {
              path: "latest",
              name: "latest_articles",
              component: () => import("@/views/user/article/ArticlesView.vue"),
            },
          ],
        },

        {
          path: "articles/create",
          name: "article_create",
          component: () => import("@/views/user/article/CreateArticleView.vue"),
          beforeEnter: Authenticated,
        },
        {
          path: "articles/:slug",
          name: "article_details",
          component: () =>
            import("@/views/user/article/ArticleDetailsView.vue"),
        },
        {
          path: "update_profile",
          component: () => import("@/views/user/profile/UpdateWrapperView.vue"),
          children: [
            {
              path: "information",
              name: "update_information",
              component: () =>
                import("@/views/user/profile/UpdateInformationView.vue"),
            },
          ],
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
