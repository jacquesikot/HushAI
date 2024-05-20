'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import { login, navigateToLogin } from './actions';
import { useTransition } from 'react';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import styled, { useTheme } from 'styled-components';
import RegisterForm from '@/components/auth/RegisterForm';
import AppLogo from '@/icons/AppLogo';
import authPatterSvg from '../../../public/images/auth-grid-bg.svg';

type ErrorMessages = {
  email?: string;
  password?: string;
  name?: string;
};

const Wrapper = styled.div`
  background-image: url(${authPatterSvg.src});
  background-repeat: no-repeat;
  background-position: top;
  background-size: 700px 700px;
  background-color: ${(props) =>
    props.theme.colors.background['bg-primary'].value};
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

export default function Register() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<ErrorMessages>({});
  const theme = useTheme();

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

    if (!name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validate()) {
      // Handle registration logic here
      console.log('Registered with:', { email, password, name });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        const data = new FormData(event.currentTarget);
        await login(data);
      } catch (error: any) {
        console.error(error);
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
      <AppLogo style={{ marginBottom: theme.spacing['spacing-3xl'].value }} />
      <HeaderText>Create an account</HeaderText>
      <Subtitle>Start your 7 day free trial</Subtitle>
      <RegisterForm
        password={password}
        setPassword={setPassword}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        handleClickLogin={() => navigateToLogin()}
        handleRegister={handleRegister}
        errors={errors}
      />
    </Wrapper>
  );
}
