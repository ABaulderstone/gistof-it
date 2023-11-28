import instance from './axios';
export interface PostData {
  id: number;
  title: string;
  content: string;
  slug: string;
}

export interface PostPage {
  currentPage: number;
  totalPages: number;
  nextPage: string | null;
  prevPage: string | null;
  data: PostData[];
}
export const getPosts = async (page = 1, limit = 5): Promise<PostPage> => {
  const response = await instance.get(`posts?page=${page}&limit=${limit}`);
  return response.data;
};
