import { readUserSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

import { createChat, logout } from './actions';
import ChatUI from '@/components/ChatUI';

export default async function Dashboard() {
  const { data } = await readUserSession();

  if (!data.session) {
    return redirect('/auth');
  }

  return <ChatUI createChat={createChat} logout={logout} />;
}
