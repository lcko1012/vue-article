import type { DirectiveBinding } from "vue";

interface IClickOutsideElement extends HTMLElement {
  __vueClickEventHandler__: (event: MouseEvent) => void;
}

export const clickOutside = {
  beforeMount: (el: IClickOutsideElement, binding: DirectiveBinding) => {
    const clickEventHandler = (event: MouseEvent) => {
      if (!(el == event.target || el.contains(event.target as HTMLElement))) {
        binding.value();
      }
    };
    el.__vueClickEventHandler__ = clickEventHandler;

    document.addEventListener("click", el.__vueClickEventHandler__);
  },
  unmounted: (el: IClickOutsideElement) => {
    document.removeEventListener("click", el.__vueClickEventHandler__);
  },
};
