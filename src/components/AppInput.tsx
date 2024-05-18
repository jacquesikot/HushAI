import React from 'react';
import styled from 'styled-components';

interface Props {
  placeholder: string;
  label: string;
  isSecured?: boolean;
  width?: number; // TODO: change to number
  type?:  string;

}
const Wrapper = styled.div``;
const LabelText = styled.p`
  color: ${(props) => props.theme.colors.text['text-secondary-(700)'].value};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: ${(props) => props.theme.spacing['spacing-sm'].value};
`;
const Input = styled.input<{ width?: number }>`
  width: ${(props) => props.width + 'px' || '100%'};
  border-radius: ${(props) => props.theme.radius['radius-md'].value};
  border: 1px solid ${(props) => props.theme.colors.border['border-primary'].value};
  background: ${(props) => props.theme.colors.background['bg-primary'].value};
  padding: 10px 14px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.text['text-placeholder'].value};

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.border['border-primary'].value};
  }

  ::placeholder {
    color: ${(props) => props.theme.colors.text['text-placeholder'].value};
  }
`;

const AppInput = (props: Props) => {
  return (
    <Wrapper>
      <LabelText>{props.label}</LabelText>
      <Input placeholder={props.placeholder} width={props.width} type={props.type} />
    </Wrapper>
  );
};

export default AppInput;
