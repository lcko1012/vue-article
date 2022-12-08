import type { Socket } from "socket.io-client";
import { useSocketIO } from "@/common/socket.io";

export type IState = {
  socket: Socket;
};

export const state: IState = {
  socket: useSocketIO().socket,
};
