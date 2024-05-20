import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import AppInput from '../AppInput';
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
  margin-bottom: ${(props) => props.theme.spacing['spacing-3xl'].value};
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

interface LoginFormProps {
  handleClickRegister: () => void;
}

const LoginForm = (props: LoginFormProps) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!/[!@#$%^&*]/.test(password)) {
        newErrors.password = newErrors.password
          ? `${newErrors.password} and contain one special character`
          : 'Password must contain one special character';
      }
    }
  };

  const handleLogin = () => {
    // if (validate()) {
    //   // Handle registration logic here
    //   console.log('Registered with:', { email, password });
    // }
  };

  return (
    <Wrapper>
      <InputWrapper>
        <AppInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          label="Email*"
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
        <AppInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          label="Password*"
          isSecured
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
      </InputWrapper>

      <StyledParagraph onClick={()=>true} style={{ marginBottom: theme.spacing['spacing-3xl'].value, marginLeft: '65%', }}><a>Forgot Password</a></StyledParagraph>
      
      <AppButton label="Sign in" onClick={handleLogin} type="primary" width={'100%'} />
      <AppButton
        style={{ marginTop: theme.spacing['spacing-xl'].value }}
        icon={<GoogleIcon />}
        label="Sign in with Google"
        onClick={() => true}
        type="secondary"
        width={'100%'}
      />

      <StyledParagraph onClick={props.handleClickRegister} style={{ marginTop: theme.spacing['spacing-2xl'].value }}>
        Do not have an account? <a href="#">Sign up</a>
      </StyledParagraph>
    </Wrapper>
  );
};

export default LoginForm;