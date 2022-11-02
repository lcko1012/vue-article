import { POSITION, type PluginOptions } from "vue-toastification";

const options: PluginOptions = {
  position: POSITION.BOTTOM_LEFT,
  transition: "Vue-Toastification__bounce",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

export default options;
