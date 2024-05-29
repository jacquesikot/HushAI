import React from 'react';
import styled from 'styled-components';
import avatarIcon from '../../../public/demo-avatar.svg';
import Image from 'next/image';

const Wrapper = styled.div`
  display: flex;
  padding: ${(props) => props.theme.spacing['spacing-2xl'].value};
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.border['border-secondary'].value};
`;

const Avatar = styled(Image)`
  margin-right: ${(props) => props.theme.spacing['spacing-xl'].value};
`;
const ChatTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  color: ${(props) => props.theme.colors.text['text-primary-(900)'].value};
`;

interface Props {
  headerText: string;
}

const ChatHeader = ({ headerText }: Props) => {
  return (
    <Wrapper>
      <Avatar src={avatarIcon} alt="Learn ICT AI Assistant Avatar Image" />

      <ChatTitle>{headerText}</ChatTitle>
    </Wrapper>
  );
};

export default ChatHeader;
