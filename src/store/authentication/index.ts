import type { Module } from "vuex";
import type { IRootState } from "..";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import type { IState } from "./state";
import { state } from "./state";

export const store: Module<IState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
