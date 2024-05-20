import React from 'react';
import styled, { useTheme } from 'styled-components';
import AppInput from '../AppInput';
import AuthCheckbox from '@/icons/AuthCheckbox';
import GoogleIcon from '@/icons/GoogleIcon';
import AppButton from './AppButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 360px;
  background-color: transparent;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${(props) => props.theme.spacing['spacing-md'].value};
  margin-bottom: ${(props) => props.theme.spacing['spacing-2xl'].value};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const StyledParagraph = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${(props) => props.theme.colors.text['text-tertiary-(600)'].value};
  margin: 0;
  cursor: pointer;

  a {
    color: ${(props) => props.theme.colors.text['text-tertiary-(600)'].value};
    text-decoration: none;
    margin-left: ${(props) => props.theme.spacing['spacing-xs'].value};
    font-weight: 600;
  }
`;

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
  margin: 5px 0 0 0;
  align-self: flex-start;
`;

interface RegisterFormProps {
  email: string;
  name: string;
  password: string;
  setPassword: (password: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  handleClickLogin: () => void;
  handleRegister: () => void;
  errors: {
    email?: string;
    password?: string;
    name?: string;
  };
}

const RegisterForm = (props: RegisterFormProps) => {
  const theme = useTheme();

  return (
    <Wrapper>
      <InputWrapper>
        <AppInput
          type='text'
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
          placeholder='Enter your name'
          label='Name*'
          width={360}
        />
        {props.errors.name && <ErrorText>{props.errors.name}</ErrorText>}
        <AppInput
          type='email'
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
          placeholder='Enter your email'
          label='Email*'
        />
        {props.errors.email && <ErrorText>{props.errors.email}</ErrorText>}
        <AppInput
          type='password'
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
          placeholder='Create a password'
          label='Password*'
          isSecured
        />
        {props.errors.password && (
          <ErrorText>{props.errors.password}</ErrorText>
        )}
      </InputWrapper>

      <CheckboxContainer>
        <AuthCheckbox
          style={{ marginRight: theme.spacing['spacing-md'].value }}
        />
        <StyledParagraph>
          Password must be at least 8 characters
        </StyledParagraph>
      </CheckboxContainer>
      <CheckboxContainer
        style={{
          marginTop: theme.spacing['spacing-lg'].value,
          marginBottom: theme.spacing['spacing-3xl'].value,
        }}
      >
        <AuthCheckbox
          style={{ marginRight: theme.spacing['spacing-md'].value }}
        />
        <StyledParagraph>
          Password must contain one special character
        </StyledParagraph>
      </CheckboxContainer>
      <AppButton
        label='Register'
        onClick={props.handleRegister}
        type='primary'
        width={'100%'}
      />
      <AppButton
        style={{ marginTop: theme.spacing['spacing-xl'].value }}
        icon={<GoogleIcon />}
        label='Sign up with Google'
        onClick={() => true}
        type='secondary'
        width={'100%'}
      />

      <StyledParagraph
        onClick={props.handleClickLogin}
        style={{ marginTop: theme.spacing['spacing-2xl'].value }}
      >
        Already have an account? <a href='#'>Login</a>
      </StyledParagraph>
    </Wrapper>
  );
};

export default RegisterForm;
