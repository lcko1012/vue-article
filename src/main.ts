import { createApp } from "vue";
import { clickOutside } from "./common/click-outside-directive";
import CKEditor from "@ckeditor/ckeditor5-vue";
import Toast from "vue-toastification";
import { LoadingPlugin } from "vue-loading-overlay";
import VueDOMPurifyHTML from "vue-dompurify-html";

import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";
import FontAwesomeIcon from "./common/fontawesome-icons";
import options from "./common/toast-options";
import { store } from "./store";
import CookieService from "./services/CookieService";
import { AuthenticationActionTypes } from "./store/authentication/actions";
import { NamespaceTypes } from "./store/contanst";
import "./common/validator";

import "./style.css";
import "vue-toastification/dist/index.css";
import "vue-loading-overlay/dist/css/index.css";
import "./assets/ckeditor.css";

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
      .use(CKEditor)
      .use(VueDOMPurifyHTML)
      .directive("clickOut", clickOutside)
      .mount("#app");
  });
