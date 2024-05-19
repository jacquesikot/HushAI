import React from 'react';
import styled, { useTheme } from 'styled-components';
import Input from './Input';

interface Props {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  width?: number;
  isSecured?: boolean;
}
const Wrapper = styled.div<{ width?: number }>`
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
`;
const LabelText = styled.p`
  color: ${(props) => props.theme.colors.text['text-secondary-(700)'].value};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin-bottom: ${(props) => props.theme.spacing['spacing-sm'].value};
`;

const AppInput = (props: Props) => {
  const theme = useTheme();
  return (
    <Wrapper width={props.width}>
      <LabelText>{props.label} </LabelText>
      <Input placeholder={props.placeholder} appTheme={theme} />
    </Wrapper>
  );
};

export default AppInput;
