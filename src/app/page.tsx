import { readUserSession } from '@/lib/actions';
import { redirect } from 'next/navigation';
import Login from './login/page';

export default async function Home() {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect('/dashboard');
  }

  return <Login />;
}
