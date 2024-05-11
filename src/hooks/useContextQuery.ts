import { getAppContexts, getChatContexts } from '@/app/dashboard/actions';
import { useQuery } from '@tanstack/react-query';

function useContextQuery(chatId?: string) {
  return {
    appContexts: useQuery({
      queryKey: ['app_context'],
      queryFn: async () => await getAppContexts(),
    }),
    chatContexts: useQuery({
      queryKey: [`chat_context_${chatId}`],
      queryFn: async () => await getChatContexts(chatId),
      enabled: !!chatId,
    }),
  };
}

export default useContextQuery;
