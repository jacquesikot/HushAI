import prompts from '@/prompts';
import { StreamingTextResponse, createStreamDataTransformer } from 'ai';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
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

export const generateEfficientInquiryChain = async (userPrompt: string, conversationHistory: string) => {
  try {
    const llm = new ChatOpenAI({
      model: 'gpt-4o',
    }) as any;
    const prompt = new PromptTemplate({
      template: prompts.inquiryTemplate,
      inputVariables: ['userPrompt', 'conversationHistory'],
    });
    const inquiryChain = prompt.pipe(llm) as any;
    const inquiryChainResult = await inquiryChain.invoke({
      userPrompt,
      conversationHistory,
    });
    const inquiry = inquiryChainResult.content;
    return inquiry;
  } catch (error) {
    throw new ApiError(500, 'Error generating efficient inquiry');
  }
};

export const answerUserQuestionStreamChain = async (
  optimisedUserInquiry: string,
  conversationHistory: string,
  contextId: string
) => {
  const matchesFromInquiry = await getMatchesFromEmbeddings(optimisedUserInquiry, 2, contextId);
  const documentTexts = getTextFromMatches(matchesFromInquiry);

  const promptTemplate = new PromptTemplate({
    template: prompts.promptTemplate,
    inputVariables: ['conversationHistory', 'userPrompt', 'context'],
  });

  const chatLLM = new ChatOpenAI({ model: 'gpt-4o', streaming: true }) as any;

  /**
   * Chat models stream message chunks rather than bytes, so this
   * output parser handles serialization and encoding.
   */
  const parser = new HttpResponseOutputParser();
  const chain = RunnableSequence.from([
    {
      userPrompt: (input) => input.userPrompt,
      conversationHistory: (input) => input.conversationHistory,
      context: (input) => input.context,
    },
    promptTemplate,
    chatLLM,
    parser,
  ]);

  // Convert the response into a friendly text-stream
  const stream = await chain.stream({
    conversationHistory,
    userPrompt: optimisedUserInquiry,
    context: documentTexts.join('\n'),
  });

  // Respond with the stream
  return new StreamingTextResponse(stream.pipeThrough(createStreamDataTransformer()));
};
