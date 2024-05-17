import { createChat, removeContextFromChat } from '@/app/dashboard/actions';
import { Chat } from '@/redux/reducers/chatReducer';
import { useMutation } from '@tanstack/react-query';

interface useChatMutationProps {
  onCreateChatSuccess: (data: Chat | null) => void;
  onRemoveChatContextSuccess: () => void;
}

const useChatMutation = (props: useChatMutationProps) => {
  const createChatMutation = useMutation({
    mutationFn: createChat,
    onSuccess: (data) => props.onCreateChatSuccess(data),
  });

  const removeChatContextMutation = useMutation({
    mutationFn: removeContextFromChat,
    onSuccess: () => {
      props.onRemoveChatContextSuccess();
    },
  });

  return {
    createChatMutation,
    removeChatContextMutation,
  };
};

export default useChatMutation;
