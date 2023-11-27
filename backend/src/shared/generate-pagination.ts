import { Pagination } from './interfaces/pagination.interface';
import { Request } from 'express';

interface GeneratePaginationOptions<T> {
  page: number;
  count: number;
  limit: number;
  data: T[];
}

interface PageLinks {
  nextPage: string | null;
  prevPage: string | null;
}

export const generateLinks = (
  req: Request,
  lastPage: number,
  mode = 'DEV',
): PageLinks => {
  const pageMatch = req.url.match(/page=(\d+)/);
  const currentPage = pageMatch ? +pageMatch[1] : 1;
  const port = mode === 'DEV' ? ':' + req.socket.localPort : '';
  const url = `${req.protocol}://${req.hostname}${port}${req.url}`;
  const prevPageNumber = currentPage - 1;
  const nextPageNumber = currentPage + 1;
  const prevPage =
    prevPageNumber === 0
      ? null
      : url.replace(/page=(\d+)/, 'page=' + prevPageNumber);
  const nextPage =
    nextPageNumber > lastPage
      ? null
      : url.replace(/page=(\d+)/, 'page=' + nextPageNumber);
  return { prevPage, nextPage };
};

export const generatePagination = <T>(
  req: Request,
  args: GeneratePaginationOptions<T>,
): Pagination<T> => {
  const { data, count, limit, page } = args;
  const lastPage = Math.ceil(count / limit);
  const { nextPage, prevPage } = generateLinks(req, lastPage, process.env.MODE);
  const pagination: Pagination<T> = {
    totalPages: lastPage,
    currentPage: page,
    nextPage,
    prevPage,
    data,
  };
  return pagination;
};
