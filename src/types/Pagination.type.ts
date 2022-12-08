export interface IPaginationResponse {
  count: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}
export interface IPaginationQueryOptions {
  take: number;
  page: number;
}
