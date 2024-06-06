'use client';

import { useState, useEffect, useRef } from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import type { ChatMessage as IChatMessage } from '@/types';
import styled from 'styled-components';
import useConversationQuery from '@/hooks/useConversationQuery';
import { set } from 'date-fns';

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
  userId: string;
  chatId: string;
}

const PlaygroundPage = (props: Props) => {
  const { data: userChatMessages, isLoading, isError, refetch } = useConversationQuery(props.userId);
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>(userChatMessages || []);
  const [input, setInput] = useState<string>('');
  const [currentAIChat, setCurrentAIChat] = useState<IChatMessage | null>(null);

  // Create a reference for the chat message container
  const chatMessageContainerRef = useRef<HTMLDivElement>(null);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    if (chatMessageContainerRef.current) {
      chatMessageContainerRef.current.scrollTop = chatMessageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (userChatMessages) {
      setChatMessages(userChatMessages);
    }
  }, [userChatMessages]);

  const handleSendMessage = async () => {
    if (input.length === 0) {
      return;
    }

    const newMessage: IChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      entry: input,
      isLoading: false,
      created_at: new Date().toISOString(),
      speaker: 'user',
      user_id: props.userId,
    };

    const aiLoadingPlaceholderMessage: IChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      entry: '',
      isLoading: true,
      created_at: new Date().toISOString(),
      speaker: 'ai',
      user_id: props.userId,
    };

    setChatMessages([...chatMessages, newMessage, aiLoadingPlaceholderMessage]);
    setInput('');
    setCurrentAIChat(aiLoadingPlaceholderMessage);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: props.userId,
        chatId: props.chatId,
        messages: [
          {
            content: input,
          },
        ],
      }),
    });

    const data = await res.json();

    const updatedMessages = [...chatMessages];
    const index = updatedMessages.findIndex((msg) => msg.id === currentAIChat?.id);

    if (index !== -1) {
      updatedMessages[index] = {
        ...updatedMessages[index],
        entry: data.content,
        isLoading: false,
      };
    }

    setChatMessages(updatedMessages);
    refetch();
  };

  return (
    <PageWrapper>
      <ContextSection>
        <h3>Contexts section</h3>
      </ContextSection>

      <ChatSection>
        <ChatHeader headerText="Your Inner Circle Trader AI Companion" />

        <ChatMessageContainer ref={chatMessageContainerRef}>
          {isLoading ? (
            <div>
              <h5>Loading...</h5>
            </div>
          ) : (
            chatMessages.map((chat) => (
              <ChatMessage
                key={chat.id}
                message={chat.entry}
                loading={chat.isLoading || false}
                time={chat.created_at}
                speaker={chat.speaker}
              />
            ))
          )}
        </ChatMessageContainer>

        <ChatInput value={input} onChange={setInput} onClickSend={handleSendMessage} />
      </ChatSection>
    </PageWrapper>
  );
};

export default PlaygroundPage;
