import { UserRoleTypes, type IUser } from "@/types/User.type";
import type { GetterTree } from "vuex";
import type { IRootState } from "..";
import type { IState } from "./state";

export enum AuthenticationGetterTypes {
  GET_USER = "getUser",
  GET_IS_LOGGED = "getIsLogged",
  GET_IS_ADMIN = "getIsAdmin",
}

export type IGetters = {
  [AuthenticationGetterTypes.GET_USER](state: IState): IUser | null;
  [AuthenticationGetterTypes.GET_IS_LOGGED](state: IState): boolean;
  [AuthenticationGetterTypes.GET_IS_ADMIN](state: IState): boolean;
};

export const getters: GetterTree<IState, IRootState> & IGetters = {
  [AuthenticationGetterTypes.GET_USER]: (state) => state.user,
  [AuthenticationGetterTypes.GET_IS_LOGGED]: (state) => state.isLogged,
  [AuthenticationGetterTypes.GET_IS_ADMIN]: (state) =>
    state.user?.role === UserRoleTypes.ADMIN,
};
