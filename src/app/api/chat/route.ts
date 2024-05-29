import { answerUserQuestionStreamChain, generateEfficientInquiryChain } from '@/services/chain-service';
import { getUserChatConversationHistory, newMessage } from '@/services/conversation-service';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { userId, chatId, messages } = await req.json();
  const entry = messages[0].content;
  // validate entry, userId, chatId
  if (!entry || !userId || !chatId) {
    return Response.json({
      status: 400,
      body: 'Invalid request',
    });
  }
  const DEFAULT_ICT_CONTEXT_ID = '39';

  await newMessage(entry, userId, chatId);
  const chatConversationHistory = await getUserChatConversationHistory(userId, 10);
  const optimisedUserInquiry = await generateEfficientInquiryChain(entry, chatConversationHistory.join('\n'));

  const response = await answerUserQuestionStreamChain(
    optimisedUserInquiry,
    chatConversationHistory.join('\n'),
    DEFAULT_ICT_CONTEXT_ID
  );

  return response;
}
