import { createClient } from '@/app/utils/supabase/server';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';

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

export const getMatchFromEmbeddings = async (inquiry: string, topK: number, contextIds: string[]) => {
  const embeddings = new OpenAIEmbeddings();
  const supabase = createClient();

  const vectorstore = new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: 'documents',
    queryName: 'match_documents',
  });

  const allContextsQueryResults = [];

  for (const contextId of contextIds) {
    const queryResult = await vectorstore.similaritySearch(inquiry, topK, {
      contextId,
    });

    allContextsQueryResults.push(...queryResult);
  }

  return (
    allContextsQueryResults.map((match) => ({
      ...match,
      metadata: match.metadata as MetaData,
    })) || []
  );
};
