import prompts from '@/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { getMatchesFromEmbeddings } from './vectorstore-service';
import ApiError from '@/utils/ApiError';

function getTextFromMatches(matches: { metadata: Record<string, any>; pageContent: string }[]) {
  return (
    matches &&
    Array.from(
      matches.reduce((map, match) => {
        const metadata = match.metadata;
        const { text, url } = metadata;
        if (!map.has(url)) {
          map.set(url, text);
        }
        return map;
      }, new Map())
    ).map(([_, text]) => text)
  );
}

export const generateYTFileNameChain = async (contextId: string, fileId: string) => {
  try {
    const nameGeneratorPrompt = 'Generate an adequate title for this YouTube video content.';
    const matches = await getMatchesFromEmbeddings(nameGeneratorPrompt, 2, contextId, fileId);
    const documentTexts = getTextFromMatches(matches);
    const contentSummary = documentTexts.join('\n');
    const llm = new ChatOpenAI({
      model: 'gpt-4o',
    }) as any;
    const prompt = new PromptTemplate({
      template: prompts.generate_yt_file_name,
      inputVariables: ['contentSummary'],
    });
    const nameChain = prompt.pipe(llm);
    const nameChainResult = (await nameChain.invoke({
      contentSummary,
    })) as any;
    const fileName = nameChainResult.content;
    return fileName;
  } catch (error) {
    throw new ApiError(500, 'Error generating YouTube file name');
  }
};

export const generateYTFileDescriptionChain = async (contextId: string, fileId: string) => {
  try {
    const descriptionGeneratorPrompt = 'Generate a description for this YouTube video content.';
    const matches = await getMatchesFromEmbeddings(descriptionGeneratorPrompt, 2, contextId, fileId);
    const documentTexts = getTextFromMatches(matches);
    const contentSummary = documentTexts.join('\n');
    const llm = new ChatOpenAI({
      model: 'gpt-4o',
    }) as any;
    const prompt = new PromptTemplate({
      template: prompts.generate_yt_file_description,
      inputVariables: ['contentSummary'],
    });
    const descriptionChain = prompt.pipe(llm);
    const descriptionChainResult = (await descriptionChain.invoke({
      contentSummary,
    })) as any;
    const description = descriptionChainResult.content;
    return description;
  } catch (error) {
    throw new ApiError(500, 'Error generating YouTube file description');
  }
};
