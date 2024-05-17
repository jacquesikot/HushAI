import { addContextToChat, createChat } from '@/app/dashboard/actions';
import { Chat } from '@/redux/reducers/chatReducer';
import { useMutation } from '@tanstack/react-query';

interface useContextMutationProps {
  onAddContextSuccess: (data: any) => void;
}

const useContextMutation = (props: useContextMutationProps) => {
  const addContextMutation = useMutation({
    mutationFn: addContextToChat,
    onSuccess: (data) => props.onAddContextSuccess(data),
  });

  return {
    addContextMutation,
  };
};

export default useContextMutation;
