import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import sendMessageIcon from '../../../public/send-message-icon.svg';

const Wrapper = styled.div`
  margin: ${(props) => props.theme.spacing['spacing-2xl'].value};
  display: flex;
  height: 104px;
  border: 1px solid ${(props) => props.theme.colors.border['border-primary'].value};
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  border-radius: ${(props) => props.theme.radius['radius-md'].value};
`;
const ChatInputField = styled.textarea`
  width: 100%;
  border-radius: ${(props) => props.theme.radius['radius-md'].value};
  border: none;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: ${(props) => props.theme.colors.text['text-placeholder'].value};
  padding: ${(props) => props.theme.spacing['spacing-lg'].value};
  background-color: ${(props) => props.theme.colors.background['bg-primary'].value};
  resize: none;
  overflow-y: auto;

  &:focus {
    border: none;
    outline: none;
  }
`;
const SendButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  right: ${(props) => props.theme.spacing['spacing-4xl'].value};
  bottom: ${(props) => props.theme.spacing['spacing-4xl'].value};
  padding: ${(props) => props.theme.spacing['spacing-md'].value};
  border-radius: ${(props) => props.theme.radius['radius-md'].value};
  cursor: pointer;
  background-color: ${(props) => props.theme.componentColors.components.buttons.primary['button-primary-bg'].value};
`;
interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickSend: () => void;
}

const ChatInput = ({ value, onChange, onClickSend }: Props) => {
  return (
    <Wrapper>
      <ChatInputField placeholder="Send a message" value={value} onChange={onChange} />

      <SendButtonContainer>
        <Image src={sendMessageIcon} alt="Learn ICT send message icon" onClick={onClickSend} />
      </SendButtonContainer>
    </Wrapper>
  );
};

export default ChatInput;
