import UserDataService from "@/services/UserDataService";
import type { IUser } from "@/types/User.type";
import type { ActionTree, ActionContext } from "vuex";
import type { IRootState } from "..";
import { AuthenticationMutationTypes, type IMutations } from "./mutations";
import type { IState } from "./state";

type AugmentedActionContext = {
  commit<K extends keyof IMutations>(
    key: K,
    payload: Parameters<IMutations[K]>[1]
  ): ReturnType<IMutations[K]>;
} & Omit<ActionContext<IState, IRootState>, "commit">;

export enum AuthenticationActionTypes {
  LOGIN = "login",
  INIT = "init",
}

export type IActions = {
  [AuthenticationActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    user: IUser
  ): void;
  [AuthenticationActionTypes.INIT]({
    commit,
  }: AugmentedActionContext): Promise<void>;
};

export const actions: ActionTree<IState, IRootState> & IActions = {
  [AuthenticationActionTypes.LOGIN]({ commit }, user: IUser) {
    commit(AuthenticationMutationTypes.LOGIN, user);
  },
  async [AuthenticationActionTypes.INIT]({ commit }) {
    const user = await UserDataService.getProfile();
    if (user) {
      commit(AuthenticationMutationTypes.LOGIN, user);
    }
  },
};
