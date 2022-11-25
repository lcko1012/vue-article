import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";
import "./style.css";
import "./common/validator";
import FontAwesomeIcon from "./common/fontawesome-icons";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import options from "./common/toast-options";
import { store } from "./store";
import CookieService from "./services/CookieService";
import { AuthenticationActionTypes } from "./store/authentication/actions";
import { NamespaceTypes } from "./store/contanst";
import { clickOutside } from "./common/click-outside-directive";
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

store
  .dispatch(`${NamespaceTypes.AUTH}/${AuthenticationActionTypes.INIT}`)
  .catch(() => {
    CookieService.removeAccessToken();
  })
  .finally(() => {
    createApp(App)
      .component("FontAwesomeIcon", FontAwesomeIcon)
      .use(store)
      .use(router)
      .use(i18n)
      .use(Toast, options)
      .use(LoadingPlugin)
      .directive("clickOut", clickOutside)
      .mount("#app");
  });
