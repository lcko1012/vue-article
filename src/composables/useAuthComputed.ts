import { AuthenticationGetterTypes } from "@/store/authentication/getters";
import { NamespaceTypes } from "@/store/contanst";
import { computed } from "vue";
import { useStore } from "vuex";

export function useAuthComputed() {
  const store = useStore();

  const currentUser = computed(() => {
    return store.getters[
      `${NamespaceTypes.AUTH}/${AuthenticationGetterTypes.GET_USER}`
    ];
  });

  const isLogged = computed(() => {
    return store.getters[
      `${NamespaceTypes.AUTH}/${AuthenticationGetterTypes.GET_IS_LOGGED}`
    ];
  });

  const isAdmin = computed(() => {
    return store.getters[
      `${NamespaceTypes.AUTH}/${AuthenticationGetterTypes.GET_IS_ADMIN}`
    ];
  });

  return { currentUser, isLogged, isAdmin };
}
