import { createClient } from '@/app/utils/supabase/server';
import { WebPDFLoader } from 'langchain/document_loaders/web/pdf';
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';

interface AddYoutubeDocumentProps {
  links: string[];
  userId: string;
  contextId: string;
  fileId: string;
}

// defaultUserId = 85913d43-d71e-4d18-8f21-50cb42360602

function truncateStringByBytes(str: string, bytes: number): string {
  const enc = new TextEncoder();
  return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));
}

export const addYoutubeDocument = async (props: AddYoutubeDocumentProps): Promise<any[]> => {
  const supabase = createClient();
  try {
    const results = await Promise.all(
      props.links.map(async (ytLink: string) => {
        const loader = YoutubeLoader.createFromUrl(ytLink, {
          language: 'en',
          addVideoInfo: true,
        });

        const docs = await loader.load();

        const documentCollections = await Promise.all(
          docs.map(async (doc) => {
            const splitter = new RecursiveCharacterTextSplitter({
              chunkSize: 500,
              chunkOverlap: 20,
            });
            const splitDocuments = await splitter.createDocuments(
              [doc.pageContent],
              [
                {
                  userId: props.userId,
                  contextId: props.contextId,
                  fileId: props.fileId,
                  text: truncateStringByBytes(doc.pageContent, 36000),
                  url: ytLink,
                },
              ]
            );

            return SupabaseVectorStore.fromDocuments(splitDocuments, new OpenAIEmbeddings(), {
              client: supabase,
              tableName: 'documents',
              queryName: 'match_documents',
            });
          })
        );
        return documentCollections;
      })
    );

    return results.flat();
  } catch (error) {
    console.error('Error adding YouTube documents:', error);
    throw error;
  }
};

export const addPdfDocument = async (props: { file: Blob; userId: string; contextId: string }) => {
  const supabase = createClient();

  const loader = new WebPDFLoader(props.file);
  const docs = await loader.load();

  // Use `map` with `Promise.all` to handle async operations
  const documentCollection = await Promise.all(
    docs.map(async (doc) => {
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 20,
      });

      const splitDocuments = await splitter.createDocuments(
        [doc.pageContent],
        [
          {
            userId: props.userId,
            contextId: props.contextId,
            text: truncateStringByBytes(doc.pageContent, 36000),
          },
        ]
      );

      // Await the completion of each vector store operation
      return SupabaseVectorStore.fromDocuments(splitDocuments, new OpenAIEmbeddings(), {
        client: supabase,
        tableName: 'documents',
        queryName: 'match_documents',
      });
    })
  );

  // `documentCollection` now contains the results of all vector store operations
  return documentCollection;
};
