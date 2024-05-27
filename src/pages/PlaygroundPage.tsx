'use client';

import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import ChatMessage from '@/components/chat/ChatMessage';
import type { ChatMessage as IChatMessage } from '@/types';
import { useState } from 'react';
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

const PlaygroundPage = () => {
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>('');

  const handleSendMessage = () => {
    if (chatInput.length > 0) {
      const newMessage: IChatMessage = {
        entry: chatInput,
        created_at: new Date().toISOString(),
        id: Math.random().toString(),
        speaker: 'user',
        user_id: '1',
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');
    }
  };
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
              loading={false}
              time={chat.created_at}
              speaker={chat.speaker}
            />
          ))}
        </ChatMessageContainer>

        <ChatInput value={chatInput} onChange={(e) => setChatInput(e.target.value)} onClickSend={handleSendMessage} />
      </ChatSection>
    </PageWrapper>
  );
};

export default PlaygroundPage;
