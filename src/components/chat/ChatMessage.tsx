'use client';

import getFormattedTime from '@/utils/getFormattedTime';
import React from 'react';
import styled from 'styled-components';

interface ChatMessageProps {
  message: string;
  time: string;
  loading: boolean;
  speaker: 'user' | 'ai';
}

const Wrapper = styled.div<{ speaker: 'ai' | 'user' }>`
  padding: 10px;
  background-color: trasparent;
  border-radius: 8px;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.speaker === 'ai' ? 'flex-start' : 'flex-end')};
`;

const Username = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  color: ${(props) => props.theme.colors.text['text-secondary-(700)'].value};
`;

const Time = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  color: ${(props) => props.theme.colors.text['text-tertiary-(600)'].value};
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const MessageWrapper = styled.div`
  background-color: #134e48;
  display: flex;
  padding: 10px 14px;
  align-items: center;
  gap: ${(props) => props.theme.spacing['spacing-md'].value};
  align-self: stretch;
`;

const LoadingDots = styled.div`
  &::before {
    content: '\\2022';
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    100% {
      color: rgba(0, 0, 0, 0);
      text-shadow:
        0.25em 0 0 rgba(0, 0, 0, 0),
        0.5em 0 0 rgba(0, 0, 0, 0);
    }

    20% {
      color: #888;
      text-shadow:
        0.25em 0 0 rgba(0, 0, 0, 0),
        0.5em 0 0 rgba(0, 0, 0, 0);
    }

    40% {
      text-shadow:
        0.25em 0 0 #888,
        0.5em 0 0 rgba(0, 0, 0, 0);
    }

    60% {
      text-shadow:
        0.25em 0 0 #888,
        0.5em 0 0 #888;
    }

    80% {
      text-shadow:
        0.25em 0 0 #888,
        0.5em 0 0 rgba(0, 0, 0, 0);
    }
  }
`;

const ChatMessage: React.FC<ChatMessageProps> = ({ message, time, loading, speaker }) => {
  return (
    <Wrapper speaker={speaker}>
      <TopContainer>
        <Username>{speaker === 'ai' ? 'AI' : 'You'}</Username>
        <Time>{getFormattedTime(time)}</Time>
      </TopContainer>

      <MessageWrapper>{loading ? <LoadingDots>...</LoadingDots> : message}</MessageWrapper>
    </Wrapper>
  );
};

export default ChatMessage;
