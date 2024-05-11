import { getChatConversations } from '@/app/dashboard/actions';
import { useQuery } from '@tanstack/react-query';

function useConversationQuery(chatId?: string | null) {
  return useQuery({
    queryKey: [`conversation_${chatId}`],
    queryFn: async () => await getChatConversations(chatId),
    enabled: !!chatId,
  });
}

export default useConversationQuery;
