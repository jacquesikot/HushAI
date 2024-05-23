'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';

import { useTransition } from 'react';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import styled, { useTheme } from 'styled-components';
import AppLogo from '@/icons/AppLogo';
import authPatterSvg from '../../../public/images/auth-grid-bg.svg';
import LoginForm from '@/components/auth/LoginForm';
import { login, navigateToRegister } from './actions';

type ErrorMessages = {
  email?: string;
  password?: string;
};

const Wrapper = styled.div`
  background-image: url(${authPatterSvg.src});
  background-repeat: no-repeat;
  background-position: top;
  background-size: 700px 700px;
  background-color: #131316;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h1`
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 38px;
  color: ${(props) => props.theme.colors.text['text-primary-(900)'].value};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: ${(props) => props.theme.colors.text['text-tertiary-(600)'].value};
  margin-bottom: ${(props) => props.theme.spacing['spacing-4xl'].value};
  margin-top: ${(props) => props.theme.spacing['spacing-lg'].value};
`;

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ErrorMessages>({});;


  const validate = (): boolean => {
    const newErrors: ErrorMessages = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (!/[!@#$%^&*]/.test(password)) {
        newErrors.password = 'Password must contain one special character';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      // Handle registration logic here
      console.log('Signed in with:', { email, password });
    }
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    startTransition(async () => {
      try {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await login(data);
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    });
  };


  if (isPending) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Wrapper>
      {/* <Image src={authPatterSvg} alt="auth-pattern" /> */}
      <AppLogo style={{ marginBottom: theme.spacing['spacing-3xl'].value }} />
      <HeaderText>Login in to your account</HeaderText>
      <Subtitle>Welcome back! Please enter your details.</Subtitle>
      <LoginForm 
       password={password}
       setPassword={setPassword}
       email={email}
       setEmail={setEmail}
       handleClickRegister={()=> navigateToRegister()}
       handleLogin={handleLogin}
       errors={errors}
       />
    </Wrapper>
  );
}
