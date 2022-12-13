import type { Module } from "vuex";

import type { IRootState } from "..";
import { getters } from "./getters";
import { state, type IState } from "./state";

export const store: Module<IState, IRootState> = {
  namespaced: true,
  state,
  getters,
};
