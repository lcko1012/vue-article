import type { ICommentsResponse } from "@/services/CommentDataService";
import type { IComment } from "@/types/Comment.type";
import type { MutationTree } from "vuex";
import type { IState } from "./state";

export enum CommentsMutationTypes {
  FETCH_COMMENTS = "fetch_comments",
  ADD_COMMENT = "add_comment",
}

export type IMutations = {
  [CommentsMutationTypes.FETCH_COMMENTS](
    state: IState,
    payload: ICommentsResponse
  ): void;
  [CommentsMutationTypes.ADD_COMMENT](state: IState, payload: IComment): void;
};

export const mutations: MutationTree<IState> & IMutations = {
  [CommentsMutationTypes.FETCH_COMMENTS](state, payload) {
    state.comments = payload;
    state.paginationQuery.page = state.paginationQuery.page + 1;
  },
  [CommentsMutationTypes.ADD_COMMENT](state: IState, payload: IComment) {
    state.comments.data.unshift(payload);
  },
};
