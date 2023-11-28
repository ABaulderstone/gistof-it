import { PostData } from '../../../services/post-services';

export interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { title, content } = post;
  return (
    <article className='border-2 border-black'>
      <h2>{title}</h2>
      <p>{content}</p>
    </article>
  );
}
