import { answerUserQuestionChain, generateEfficientInquiryChain } from '@/services/chain-service';
import { getUserChatConversationHistory, newMessage } from '@/services/conversation-service';

export async function POST(req: Request) {
  const { userId, chatId, messages } = await req.json();
  const entry = messages[0].content;

  if (!entry || !userId || !chatId) {
    return Response.json({
      status: 400,
      body: 'Invalid request',
    });
  }

  const DEFAULT_ICT_CONTEXT_ID = '39';

  await newMessage(entry, userId, chatId, 'user');
  const chatConversationHistory = await getUserChatConversationHistory(userId, 10);
  const optimisedUserInquiry = await generateEfficientInquiryChain(entry, chatConversationHistory.join('\n'));
  const completeResponse = await answerUserQuestionChain(optimisedUserInquiry, '', DEFAULT_ICT_CONTEXT_ID);
  await newMessage(completeResponse.content, userId, chatId, 'ai');

  return Response.json({
    status: 200,
    content: completeResponse.content,
  });
}
