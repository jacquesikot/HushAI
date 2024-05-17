import { createConversationMessage } from '@/app/dashboard/actions';
import { useMutation } from '@tanstack/react-query';

interface useConversatioMutationProps {
  onAddConversationSuccess: (data: any) => void;
}

const useConversationMutation = (props: useConversatioMutationProps) => {
  const addConversationMutation = useMutation({
    mutationFn: createConversationMessage,
    onSuccess: (data) => props.onAddConversationSuccess(data),
  });

  return {
    addConversationMutation,
  };
};

export default useConversationMutation;
