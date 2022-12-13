import type { ActionContext, ActionTree } from "vuex";

import type { IComment } from "@/types/Comment.type";
import type { IRootState } from "..";
import { CommentsMutationTypes, type IMutations } from "./mutations";
import { state, type IState } from "./state";
import CommentDataService from "@/services/CommentDataService";

type AugmentedActionContext = {
  commit<K extends keyof IMutations>(
    key: K,
    payload: Parameters<IMutations[K]>[1]
  ): ReturnType<IMutations[K]>;
} & Omit<ActionContext<IState, IRootState>, "commit">;

export enum CommentsActionTypes {
  FETCH_COMMENTS = "fetch_comments",
  ADD_COMMENT = "add_comment",
}

export type IActions = {
  [CommentsActionTypes.FETCH_COMMENTS](
    { commit }: AugmentedActionContext,
    articleId: number
  ): void;
  [CommentsActionTypes.ADD_COMMENT](
    { commit }: AugmentedActionContext,
    newComment: IComment
  ): void;
};

export const actions: ActionTree<IState, IRootState> & IActions = {
  async [CommentsActionTypes.FETCH_COMMENTS]({ commit }, articleId) {
    const comments = await CommentDataService.getAll(
      articleId,
      state.paginationQuery
    );
    commit(CommentsMutationTypes.FETCH_COMMENTS, comments);
  },
  [CommentsActionTypes.ADD_COMMENT]({ commit }, newComment) {
    commit(CommentsMutationTypes.ADD_COMMENT, newComment);
  },
};
