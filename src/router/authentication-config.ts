import { store } from "@/store";
import { AuthenticationGetterTypes } from "@/store/authentication/getters";
import { NamespaceTypes } from "@/store/contanst";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import toast from "@/common/toast";
import { i18n } from "@/i18n";

export const Authenticated = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (
    store.getters[
      `${NamespaceTypes.AUTH}/${AuthenticationGetterTypes.GET_IS_LOGGED}`
    ]
  ) {
    return next();
  }
  next("/login");
};

export const IsAuthRoutes = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authRoutes = ["login"];
  if (
    store.getters[
      `${NamespaceTypes.AUTH}/${AuthenticationGetterTypes.GET_IS_LOGGED}`
    ] &&
    authRoutes.includes(to?.name?.toString() || "")
  ) {
    return next("/");
  }
  next();
};

export const Authorizated = (
  _to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const isAdmin =
    store.getters[
      `${NamespaceTypes.AUTH}/${AuthenticationGetterTypes.GET_IS_ADMIN}`
    ];

  if (isAdmin) {
    return next();
  }
  toast.warning(i18n.global.t("errors.authorization"));
  next("/");
};
