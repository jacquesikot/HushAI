import { supabaseAdminClient } from '@/lib/supabase';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';

export const getMatchesFromEmbeddings = async (
  inquiry: string,
  topK: number = 2,
  contextId: string,
  fileId: string
) => {
  const embeddings = new OpenAIEmbeddings();

  const vectorstore = new SupabaseVectorStore(embeddings, {
    client: supabaseAdminClient,
    tableName: 'documents',
    queryName: 'match_documents',
  });

  const queryResult = await vectorstore.similaritySearch(inquiry, topK, {
    contextId,
    fileId,
  });

  return (
    queryResult.map((match) => ({
      ...match,
      metadata: match.metadata,
    })) || []
  );
};
