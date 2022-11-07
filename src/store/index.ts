import { createStore } from "vuex";
import type { IState as IAuthenticationState } from "@/store/authentication/state";
import { store as authentication } from "@/store/authentication";

export type IRootState = {
  authentication: IAuthenticationState;
};

export const store = createStore({
  modules: {
    authentication,
  },
});
