import PlaygroundPage from '@/pages/PlaygroundPage';
import React from 'react';
import { signInAnonymousUser } from './action';

const Playground = async () => {
  const anonData = await signInAnonymousUser();

  return <PlaygroundPage messages={[]} chatId={anonData?.chat?.id as string} userId={anonData?.user?.id as string} />;
};

export default Playground;
