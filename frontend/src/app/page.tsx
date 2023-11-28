import Link from 'next/link';
import instance from '../services/axios';
import { PostData, getPosts } from '../services/post-services';
import Post from './_subcomponents/Post';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const prevPage = page > 1 ? page - 1 : null;
  const postPage = await getPosts(page);
  const nextPage = page + 1;
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <section className='flex flex-col gap-2'>
        {postPage.data.map((post: PostData) => (
          <Post key={post.id} post={post} />
        ))}
      </section>
      <div className='flex flex-row justify-between w-full'>
        {prevPage && <Link href={`/?page=${prevPage}`}>Back</Link>}
        {nextPage < postPage.totalPages && (
          <Link href={`/?page=${nextPage}`}>Next</Link>
        )}
      </div>
    </main>
  );
}
