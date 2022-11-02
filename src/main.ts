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

createApp(App)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .use(router)
  .use(i18n)
  .use(Toast, options)
  .mount("#app");
