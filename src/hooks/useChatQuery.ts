import { getUserChats } from '@/app/dashboard/actions';
import { useQuery } from '@tanstack/react-query';

function useChatQuery() {
  return useQuery({
    queryKey: ['chat'],
    queryFn: async () => await getUserChats(),
  });
}

export default useChatQuery;
