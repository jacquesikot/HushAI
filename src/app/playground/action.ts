'use server';

import { supabaseAdminClient } from '@/lib/supabase';

export const fetchUserMessages = async (userId: string) => {
  try {
    const { data, error } = await supabaseAdminClient.from('conversation').select('*').eq('user_id', userId);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createDefaultChat = async (userId: string) => {
  try {
    const getUserDefaultChat = await supabaseAdminClient.from('chat').select('*').eq('user_id', userId).single();
    if (getUserDefaultChat.data && getUserDefaultChat.data.length > 0) {
      return getUserDefaultChat.data;
    }

    const { data } = await supabaseAdminClient
      .from('chat')
      .insert({ user_id: userId, title: 'Default Chat', description: 'Default Chat' })
      .select('*');

    return data;
  } catch (error) {
    throw error;
  }
};

export const signInAnonymousUser = async () => {
  await supabaseAdminClient.auth.refreshSession();
  try {
    const { data } = await supabaseAdminClient.auth.signInAnonymously({
      options: {
        data: {
          someData: '1234512',
        },
      },
    });
    const chatData = await createDefaultChat(data.user?.id as string);
    const userMessages = await fetchUserMessages(data.user?.id as string);
    return {
      user: data.user,
      chat: chatData[0],
      messages: userMessages,
    };
  } catch (error) {
    console.error(error);
  }
};
