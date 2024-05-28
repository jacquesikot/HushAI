'use client';

import { useRef, useState } from 'react';
import { useChat } from 'ai/react';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import type { ChatMessage as IChatMessage } from '@/types';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background['bg-primary'].value};
`;

const ContextSection = styled.div`
  display: flex;
  width: 50%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ChatSection = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  border-left: 1px solid ${(props) => props.theme.colors.border['border-secondary'].value};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ChatMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing['spacing-2xl'].value};
  flex: 1;
`;

interface Props {
  messages: IChatMessage[];
  userId: string;
  chatId: string;
}

const PlaygroundPage = (props: Props) => {
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>(props.messages);
  const [currentAIChat, setCurrentAIChat] = useState<IChatMessage | null>(null);

  const chatMessagesRef = useRef(chatMessages);
  const currentAiChatRef = useRef(currentAIChat);
  chatMessagesRef.current = chatMessages;
  currentAiChatRef.current = currentAIChat;

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'api/chat',
    body: {
      userId: props.userId,
      chatId: props.chatId.toString(),
    },
    onError: (e) => {},
    onResponse: async (data) => {
      const reader = data.body?.getReader() as any;
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value, { stream: true });
        console.log('🚀 ~ onResponse: ~ chunk:', chunk);
        const chunkData = chunk.split(':"')[1]?.slice(0, -1) ?? '';

        const updatedMessages = [...chatMessagesRef.current];
        const index = updatedMessages.findIndex((msg) => msg.id === currentAiChatRef?.current?.id);

        if (index !== -1) {
          updatedMessages[index] = {
            ...updatedMessages[index],
            entry: updatedMessages[index].entry + chunkData,
            isLoading: false,
          };
        }

        setChatMessages(updatedMessages);
      }
    },
  });

  return (
    <PageWrapper>
      <ContextSection>
        <h3>Contexts section</h3>
      </ContextSection>

      <ChatSection>
        <ChatHeader headerText="Your Inner Circle Trader AI Companion" />

        <ChatMessageContainer>
          {chatMessages.map((chat) => (
            <ChatMessage
              key={chat.id}
              message={chat.entry}
              loading={chat.isLoading || false}
              time={chat.created_at}
              speaker={chat.speaker}
            />
          ))}
        </ChatMessageContainer>

        <ChatInput
          value={input}
          onChange={(e) => handleInputChange(e)}
          onClickSend={(e: any) => {
            e.preventDefault();
            const newMessage: IChatMessage = {
              entry: input,
              created_at: new Date().toISOString(),
              id: Math.random().toString(),
              speaker: 'user',
              user_id: props.userId,
            };

            const aiLoadingPlaceholder: IChatMessage = {
              entry: '',
              created_at: new Date().toISOString(),
              id: Math.random().toString(),
              speaker: 'ai',
              user_id: '0',
              isLoading: true,
            };

            setCurrentAIChat(aiLoadingPlaceholder);
            setChatMessages([...chatMessages, newMessage, aiLoadingPlaceholder]);
            handleSubmit(e);
          }}
        />
      </ChatSection>
    </PageWrapper>
  );
};

export default PlaygroundPage;
