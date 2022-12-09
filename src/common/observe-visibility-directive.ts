import type { ComponentPublicInstance, DirectiveBinding, VNode } from "vue";
import { ObserveVisibility } from "vue-observe-visibility";

interface IVnode extends VNode {
  context?: ComponentPublicInstance | null;
}

export const observeVisibility = {
  beforeMount: (el: HTMLElement, binding: DirectiveBinding, vnode: IVnode) => {
    vnode.context = binding.instance;
    ObserveVisibility.bind(el, binding, vnode);
  },
  updated: ObserveVisibility.update,
  unmounted: ObserveVisibility.unbind,
};
