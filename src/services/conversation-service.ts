import { supabaseAdminClient } from '@/lib/supabase';

export const newMessage = async (entry: string, userId: string, chatId: string, speaker: 'user' | 'ai') => {
  try {
    const { data } = await supabaseAdminClient
      .from('conversation')
      .insert({
        speaker: speaker,
        user_id: userId,
        chat_id: chatId,
        entry,
      })
      .select()
      .single()
      .throwOnError();

    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserChatConversationHistory = async (userId: string, limit: number) => {
  try {
    const { data: history } = await supabaseAdminClient
      .from('conversation')
      .select('entry, speaker, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
      .throwOnError();

    const response = history
      ? history
          .map((entry) => {
            return `${entry.speaker.toUpperCase()}: ${entry.entry}`;
          })
          .reverse()
      : [];
    return response;
  } catch (error) {
    throw error;
  }
};
