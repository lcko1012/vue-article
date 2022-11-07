import type { IUser } from "@/types/User.type";
import type { MutationTree } from "vuex";
import type { IState } from "./state";

export enum AuthenticationMutationTypes {
  LOGIN = "login",
}

export type IMutations = {
  [AuthenticationMutationTypes.LOGIN](state: IState, payload: IUser): void;
};

export const mutations: MutationTree<IState> & IMutations = {
  [AuthenticationMutationTypes.LOGIN](state: IState, user: IUser) {
    state.user = user;
    state.isLogged = true;
  },
};
