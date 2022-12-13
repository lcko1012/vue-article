import type { Socket } from "socket.io-client";
import type { GetterTree } from "vuex";

import type { IRootState } from "..";
import type { IState } from "./state";

export enum SocketGetterTypes {
  GET_SOCKET = "getSocket",
}

export type IGetters = {
  [SocketGetterTypes.GET_SOCKET](state: IState): Socket;
};

export const getters: GetterTree<IState, IRootState> & IGetters = {
  [SocketGetterTypes.GET_SOCKET]: (state) => state.socket,
};
