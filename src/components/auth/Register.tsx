import React, { useState } from 'react';
import styled from 'styled-components';
import AppInput from '../AppInput';
import FormLabel from '../formLabel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import RegisterLogo from '@/app/applogos/registerlogo';

const Wrapper = styled.div`
  color: ${(props) => props.theme.colors.text['text-primary-(900)'].value};
  display: flex;
  width: 1440px;
  min-height: 960px;
  padding: var(--spacing-9xl, 96px) 0px var(--spacing-6xl, 48px) 0px;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4xl, 32px);
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.text['text-primary-(900)'].value};
  font-family: inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  margin-top: 12px;
`;

const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.text['text-tertiary-(600)'].value};
  text-align: center;
  font-family: Inter, sans-serif; /* Added a fallback font */
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #6a1b9a;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #5a1380;
  }
`;

const GoogleButton = styled(Button)`
  background-color: #4285f4;
  margin-top: 1rem;

  &:hover {
    background-color: #357ae8;
  }
`;

const LoginLink = styled.a`
  margin-top: 1rem;
  color: #9e9e9e;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledParagraph = styled.p`
  margin-left: 5px; /* Adjust as needed */
`;

const Register: React.FC = () => {
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
      <Form onSubmit={handleSubmit}>
        <RegisterLogo/>
        <Title>Create an account</Title>
        <Subtitle>Start your 7-day free trial.</Subtitle>
        <FormLabel label='Name*'/>
        <AppInput
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter your name'
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        <FormLabel label='Email*'/>
        <AppInput
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <FormLabel label='Password*'/>
        <AppInput
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <StyledContainer>
          <StyledItem>
            {hasMinLength && <FontAwesomeIcon icon={faCheckCircle} color='green' />}
            <StyledParagraph>Password must be at least 8 characters</StyledParagraph>
          </StyledItem>
          <StyledItem>
            {hasSpecialChar && <FontAwesomeIcon icon={faCheckCircle} color='green' />}
            <StyledParagraph>Password must contain one special character</StyledParagraph>
          </StyledItem>
        </StyledContainer>
        <Button type='submit'>Register</Button>
        <GoogleButton>Sign up with Google</GoogleButton>
        <LoginLink href='#'>Already have an account? Log in</LoginLink>
      </Form>
    </Wrapper>
  );
};

export default Register;
