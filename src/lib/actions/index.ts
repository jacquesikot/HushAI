import { createClient } from '@/app/utils/supabase/server';
import ROUTES from '@/constants/route';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';
import { redirect } from 'next/navigation';

export const readUserSession = () => {
  const supabase = createClient();
  return supabase.auth.getSession();
};

export interface MetaData {
  userId: string;
  contextId: string;
  url: string;
  text: string;
}

export const getMatchFromEmbeddings = async (inquiry: string, topK: number, contextId: string) => {
  const embeddings = new OpenAIEmbeddings({});
  const supabase = createClient();

  const vectorstore = new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: 'documents',
    queryName: 'match_documents',
  });

  const queryResult = await vectorstore.similaritySearch(inquiry, topK, {
    contextId,
  });

  return (
    queryResult.map((match) => ({
      ...match,
      metadata: match.metadata as MetaData,
    })) || []
  );
};
