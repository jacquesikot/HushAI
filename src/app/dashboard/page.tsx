import { readUserSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

import { createChat, logout } from './actions';
import ChatUI from '@/components/ChatUI';
import ROUTES from '@/constants/route';

export default async function Dashboard() {
  const { data } = await readUserSession();

  if (!data.session) {
    return redirect(ROUTES.LOGIN);
  }

  return <ChatUI createChat={createChat} logout={logout} />;
  // return (
  //   <>
  //     <AppLayout />
  //   </>
  // );
}
