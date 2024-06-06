import { fetchUserMessages } from '@/app/playground/action';
import { useQuery } from '@tanstack/react-query';

function useConversationQuery(userId?: string | null) {
  return useQuery({
    queryKey: [`conversation_${userId}`],
    queryFn: async () => await fetchUserMessages(userId as string),
    enabled: !!userId,
  });
}

export default useConversationQuery;
