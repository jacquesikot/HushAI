'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';

import { makeStore, AppStore } from '../../redux/store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(setChats(chats));
    // chats.length > 0 && storeRef.current.dispatch(setActiveChat(chats[0]));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}