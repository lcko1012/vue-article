import { createStore } from "vuex";
import type { IState as IAuthenticationState } from "@/store/authentication/state";
import type { IState as ICommentsState } from "@/store/comments/state";
import type { IState as ISocketState } from "@/store/socket/state";
import { store as authentication } from "@/store/authentication";
import { store as comments } from "@/store/comments";
import { store as socket } from "@/store/socket";

export type IRootState = {
  authentication: IAuthenticationState;
  comments: ICommentsState;
  socket: ISocketState;
};

export const store = createStore({
  modules: {
    authentication,
    comments,
    socket,
  },
});
