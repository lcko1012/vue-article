import type { ICommentsResponse } from "@/services/CommentDataService";
import type { GetterTree } from "vuex";
import type { IRootState } from "..";
import type { IState } from "./state";

export enum CommentsGetterTypes {
  GET_COMMENTS = "getComments",
}

export type IGetters = {
  [CommentsGetterTypes.GET_COMMENTS](state: IState): ICommentsResponse;
};

export const getters: GetterTree<IState, IRootState> & IGetters = {
  [CommentsGetterTypes.GET_COMMENTS]: (state) => state.comments,
};
