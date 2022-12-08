import { computed } from "vue";
import { useStore } from "vuex";

import { NamespaceTypes } from "@/store/contanst";
import { SocketGetterTypes } from "@/store/socket/getters";

export function useSocketComputed() {
  const store = useStore();

  const socket = computed(() => {
    return store.getters[
      `${NamespaceTypes.SOCKET}/${SocketGetterTypes.GET_SOCKET}`
    ];
  });

  return { socket };
}
