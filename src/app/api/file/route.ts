import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube';
import { createClient } from '@/app/utils/supabase/server';

function truncateStringByBytes(str: string, bytes: number) {
  const enc = new TextEncoder();
  return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));
}

export async function POST(req: Request, res: Response) {
  const supabase = createClient();
  const { ytLinks, userId, contextId } = await req.json();
  ytLinks.forEach(async (ytLink: string) => {
    const loader = YoutubeLoader.createFromUrl(ytLink, {
      language: 'en',
      addVideoInfo: true,
    });

    const docs = await loader.load();

    const documentCollection = await Promise.all(
      docs.map(async (doc) => {
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 500,
          chunkOverlap: 20,
        });
        const splitDocuments = await splitter.createDocuments(
          [doc.pageContent],
          [
            {
              userId: userId.toString(),
              contextId: contextId.toString(),
              text: truncateStringByBytes(doc.pageContent, 36000),
              url: ytLink,
            },
          ]
        );

        await SupabaseVectorStore.fromDocuments(splitDocuments, new OpenAIEmbeddings(), {
          client: supabase,
          tableName: 'documents',
          queryName: 'match_documents',
        });
      })
    );

    return documentCollection;
  });

  return Response.json({ success: true });
}
