import { readUserSession } from '@/lib/actions';
import AuthPage from './auth/page';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect('/dashboard');
  }

  return <AuthPage />;
}
