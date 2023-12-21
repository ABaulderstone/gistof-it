export class PostDataDto {
  id: number;
  title: string;
  slug: string;
  content: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    username: string;
  };
}
