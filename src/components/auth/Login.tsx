import Logomark from "@/appIcons/Logomark";
import React from "react";
import styled from "styled-components";
import AppInput from "../AppInput";
import CheckInput from "../CheckInput";
import Button from "../Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  // max-width: 360px;
  align-items: center;
  gap: ${(props) => props.theme.spacing["spacing-4xl"].value};
  align-self: stretch;
  border: 1px solid pink;
  background: ${(props) => props.theme.colors.background["bg-primary"].value};
`;
const Logo = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing["spacing-3xl"].value};
`;

const HeaderText = styled.div``;

const H1 = styled.h1`
  color: ${(props) => props.theme.colors.text["text-primary-(900)"].value};
  text-align: center;
  /* Display sm/Semibold */
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 38px;
`;
const P = styled.p`
  color: ${(props) => props.theme.colors.text["text-tertiary-(600)"].value};
  text-align: center;
  /* Text md/Regular */
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const Form = styled.form``;
const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing["spacing-xl"].value};
`;

const Footer = styled.div`

`

const Span = styled.span`
color: ${(props) => props.theme.componentColors.components.buttons["tertiary-color"]["button-tertiary-color-fg"].value} ;
/* Text sm/Semibold */
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 20px; 
`

const Login = () => {
  return (
    <Wrapper>
      <Header>
        <Logo>
          <Logomark />
        </Logo>
        <HeaderText>
          <H1>Log in to your account</H1>
          <P>Welcome back! Please enter your details.</P>
        </HeaderText>
      </Header>

      <Form>
        <AppInput label="Email" placeholder="Enter your Email" width={360} />
        <AppInput
          label="Password"
          placeholder="Enter your Password"
          width={360}
          type="password"
        />
        <CheckInput label="Remember for 30 days" />
      </Form>

      <Actions>
        <Button label="Sign in" type="primary" width={360} />
        <Button label="Sign in with Google" type="secondary" width={360} />
      </Actions>

      <Footer>
        <P>Don't have an account?
        <Span> Sign up</Span>
        </P>
      </Footer>
    </Wrapper>
  );
};

export default Login;
