import type { ICommentsResponse } from "@/services/CommentDataService";
import type { IPaginationQueryOptions } from "@/types/Pagination.type";

export type IState = {
  comments: ICommentsResponse;
  paginationQuery: IPaginationQueryOptions;
};

export const state: IState = {
  comments: {
    data: [],
    pagination: {
      count: 0,
      currentPage: 0,
      nextPage: 0,
      prevPage: 0,
      lastPage: 0,
    },
  },
  paginationQuery: {
    take: 10,
    page: 1,
  },
};
