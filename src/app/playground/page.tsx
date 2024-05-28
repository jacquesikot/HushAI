import PlaygroundPage from '@/pages/PlaygroundPage';
import React from 'react';
import { createDefaultChat, fetchUserMessages, signInAnonymousUser } from './action';
import { ChatMessage } from '@/types';

const Playground = async () => {
  const anonData = await signInAnonymousUser();

  return <PlaygroundPage messages={[]} chatId={anonData?.chat?.id as string} userId={anonData?.user?.id as string} />;
};

export default Playground;
