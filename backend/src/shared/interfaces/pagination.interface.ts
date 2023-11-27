export interface Pagination<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
  nextPage: string | null;
  prevPage: string | null;
}
