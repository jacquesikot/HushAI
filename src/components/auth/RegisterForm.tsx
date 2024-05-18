import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import AppInput from '../AppInput';
import AuthCheckbox from '@/appIcons/AuthCheckbox';
import GoogleIcon from '@/appIcons/GoogleIcon';
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
  color: #a0a0ab;
  margin: 0;
  cursor: pointer;

  a {
    color: ${(props) => props.theme.colors.text['text-primary-(900)'].value};
    text-decoration: none;
    margin-left: ${(props) => props.theme.spacing['spacing-xs'].value};
    font-weight: 600;
  }
`;

interface RegisterFormProps {
  handleClickLogin: () => void;
}

const RegisterForm = (props: RegisterFormProps) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      email?: string;
      password?: string;
      name?: string;
    } = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!name) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      // Handle registration logic here
      console.log('Registered with:', { email, password, name });
    }
  };

  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  return (
    <Wrapper>
      <InputWrapper>
        <AppInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          label="Name*"
          width={360}
        />
        <AppInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          label="Email*"
        />
        <AppInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          label="Password*"
          isSecured
        />
      </InputWrapper>

      <CheckboxContainer>
        <AuthCheckbox style={{ marginRight: theme.spacing['spacing-md'].value }} />
        <StyledParagraph>Password must be at least 8 characters</StyledParagraph>
      </CheckboxContainer>
      <CheckboxContainer
        style={{ marginTop: theme.spacing['spacing-lg'].value, marginBottom: theme.spacing['spacing-3xl'].value }}
      >
        <AuthCheckbox style={{ marginRight: theme.spacing['spacing-md'].value }} />
        <StyledParagraph>Password must contain one special character</StyledParagraph>
      </CheckboxContainer>
      <AppButton label="Register" onClick={() => true} type="primary" width={'100%'} />
      <AppButton
        style={{ marginTop: theme.spacing['spacing-xl'].value }}
        icon={<GoogleIcon />}
        label="Sign up with Google"
        onClick={() => true}
        type="secondary"
        width={'100%'}
      />

      <StyledParagraph onClick={props.handleClickLogin} style={{ marginTop: theme.spacing['spacing-2xl'].value }}>
        Already have an account? <a href="#">Login</a>
      </StyledParagraph>
    </Wrapper>
  );
};

export default RegisterForm;
