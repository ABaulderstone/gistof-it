import instance from '../services/axios';

export default async function Home() {
  const { data: message } = await instance.get('/');
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <p>{message}</p>
    </main>
  );
}
