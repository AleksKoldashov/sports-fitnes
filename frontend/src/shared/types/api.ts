export interface IPagination {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface IApiResponse<T> {
  data: T[];
  pagination: IPagination;
}
