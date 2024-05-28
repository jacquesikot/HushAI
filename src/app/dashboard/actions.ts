'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';

import { createClient } from '../utils/supabase/server';
import { Chat } from '@/redux/reducers/chatReducer';
import { MetaData, getMatchFromEmbeddings } from '@/lib/actions';

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/auth');
}

export async function getUserChats(): Promise<Chat[] | []> {
  const supabase = createClient();
  const { data, error } = await supabase.from('chat').select('*');

  if (error) {
    throw error;
  }

  return data ? data : [];
}

export const createChat = async (chat: { title?: string; description?: string }): Promise<Chat | null> => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('chat')
    .insert({
      title: 'New Chat',
      description: 'Chat Description',
      user_id: userData.user?.id,
    })
    .select();

  if (error) {
    throw error;
  }

  return data ? (data[0] as Chat) : null;
};

export const getChatConversations = async (chatId?: string | null) => {
  if (!chatId) return [];
  const supabase = createClient();
  const { data, error } = await supabase.from('conversation').select('*').eq('chat_id', chatId);

  if (error) {
    throw error;
  }

  return data ? data : [];
};

export const getAppContexts = async () => {
  const APP_ACCOUNT_ID = '48a97cdd-630b-4c03-97d0-6fc197ad0ac5';
  const supabase = createClient();
  const { data, error } = await supabase.from('context').select('*').eq('user_id', APP_ACCOUNT_ID);

  if (error) {
    throw error;
  }

  return data ? data : [];
};

export const getChatContexts = async (chatId?: string) => {
  if (!chatId) return [];
  const supabase = createClient();
  const { data, error } = await supabase.from('chat_context').select('*, context(*)').eq('chat_id', chatId);

  if (error) {
    throw error;
  }

  return data ? data : [];
};

export const addContextToChat = async (chatContext: { chatId: string; contextId: string }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('chat_context')
    .insert({ chat_id: chatContext.chatId, context_id: chatContext.contextId })
    .select()
    .throwOnError();

  return data ? data : [];
};

export const createConversationMessage = async (convo: { chat_id: string; message: string }) => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  await supabase
    .from('conversation')
    .insert({
      speaker: 'user',
      user_id: userData.user?.id,
      chat_id: convo.chat_id,
      entry: convo.message,
    })
    .select()
    .single()
    .throwOnError();

  const chatContext = await getChatContexts(convo.chat_id);
  // const llm = new ChatOpenAI();
  // const prompt = new PromptTemplate({
  //   template: prompts.inquiryTemplate,
  //   inputVariables: ['userPrompt'],
  // });
  // const inquiryChain = prompt.pipe(llm);
  // const inquiryChainResult = await inquiryChain.invoke({
  //   userPrompt: convo.message,
  // });
  // const inquiry = inquiryChainResult.content;

  if (!chatContext || chatContext.length < 1) {
    return await supabase
      .from('conversation')
      .insert({
        speaker: 'ai',
        user_id: userData.user?.id,
        chat_id: convo.chat_id,
        entry: 'I am sorry, no context was provided to answer your question.',
      })
      .select()
      .single();
  } else {
    const matches: any = await getMatchFromEmbeddings(convo.message as string, 3, chatContext[0].context_id.toString());
    if (!matches || matches.length < 1) {
      return await supabase
        .from('conversation')
        .insert({
          speaker: 'ai',
          user_id: userData.user?.id,
          chat_id: convo.chat_id,
          entry: 'I am sorry, the context provided does not have an answer to your question',
        })
        .select()
        .single();
    }
    const urls =
      matches &&
      Array.from(
        new Set(
          matches.map((match: any) => {
            const metadata = match.metadata as MetaData;
            const { url } = metadata;
            return url;
          })
        )
      );

    const docs =
      matches &&
      Array.from(
        matches.reduce((map: any, match: any) => {
          const metadata = match.metadata as MetaData;
          const { text, url } = metadata;
          if (!map.has(url)) {
            map.set(url, text);
          }
          return map;
        }, new Map())
      ).map(([_, text]: any) => text);

    const promptTemplate = new PromptTemplate({
      template: ``,
      inputVariables: ['question', 'context'],
    });

    const chat = new ChatOpenAI({
      modelName: 'gpt-4o',
    }) as any;

    const chain = promptTemplate.pipe(chat);

    const response = (await chain.invoke({
      question: convo.message,
      context: docs.join('\n'),
    })) as any;
    await supabase
      .from('conversation')
      .insert({
        speaker: 'ai',
        user_id: userData.user?.id,
        chat_id: convo.chat_id,
        entry: response.content,
      })
      .select()
      .single();
  }
};

export const removeContextFromChat = async (chatContext: { chatId: string; contextId: string }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('chat_context')
    .delete()
    .eq('chat_id', chatContext.chatId)
    .eq('context_id', chatContext.contextId)
    .throwOnError();

  return data ? data : [];
};
