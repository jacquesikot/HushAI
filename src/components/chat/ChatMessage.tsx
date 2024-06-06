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
  margin-bottom: ${(props) => props.theme.spacing['spacing-md'].value};
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
  margin-bottom: ${(props) => props.theme.spacing['spacing-sm'].value};
`;

const MessageWrapper = styled.div<{ speaker: 'ai' | 'user' }>`
  background-color: ${(props) =>
    props.speaker === 'user' ? '#134e48' : props.theme.colors.background['bg-secondary'].value};
  border: 1px solid
    ${(props) => (props.speaker === 'ai' ? props.theme.colors.border['border-secondary'].value : '#134e48')};
  display: flex;
  padding: 10px 14px;
  align-items: center;
  gap: ${(props) => props.theme.spacing['spacing-md'].value};
  align-self: stretch;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: ${(props) => props.theme.colors.text['text-white'].value};
  border-top-left-radius: ${(props) => (props.speaker === 'user' ? props.theme.radius['radius-md'].value : 0)};
  border-bottom-left-radius: ${(props) => props.theme.radius['radius-md'].value};
  border-bottom-right-radius: ${(props) => props.theme.radius['radius-md'].value};
  border-top-right-radius: ${(props) => (props.speaker === 'ai' ? props.theme.radius['radius-md'].value : 0)};
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
        0.5em 0 0 rgba(0, 0, 0, 0),
        0.75em 0 0 rgba(0, 0, 0, 0);
    }

    20% {
      color: #888;
      text-shadow:
        0.5em 0 0 rgba(0, 0, 0, 0),
        0.75em 0 0 rgba(0, 0, 0, 0);
    }

    40% {
      text-shadow:
        0.5em 0 0 #888,
        0.75em 0 0 rgba(0, 0, 0, 0);
    }

    60% {
      text-shadow:
        0.5em 0 0 #888,
        0.75em 0 0 #888;
    }

    80% {
      text-shadow:
        0.5em 0 0 #888,
        0.75em 0 0 rgba(0, 0, 0, 0);
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

      <MessageWrapper speaker={speaker}>
        {loading ? <LoadingDots /> : <div dangerouslySetInnerHTML={{ __html: message }} />}
      </MessageWrapper>
    </Wrapper>
  );
};

export default ChatMessage;
