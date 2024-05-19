import React from "react";
import styled from "styled-components";

// interface Props {
//   placeholder?: string;
//   label: string;
//   isSecured?: boolean;
//   width?: number; // TODO: change to number
//   type?: string;
// }

// const Wrapper = styled.div<{ width?: number }>`
//   display: flex;
//   flex: 1 0 0;
//   width: ${(props) => props.width + "px" || "100%"};
//   align-items: center;
//   // gap: 10px;
//   background: ${(props) => props.theme.colors.background["bg-primary"].value};
//   padding: 0 14px;
//   `;
  
  const Input = styled.input`
  border-radius: ${(props) => props.theme.radius["radius-md"].value};
  border: 1px solid;
  ${(props) => props.theme.colors.border["border-primary"].value};
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  marginRight: theme.spacing['spacing-md'].value
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing["spacing-3xl"].value};
`;

const StyledParagraph = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: ${(props) => props.theme.colors.text['text-tertiary-(600)'].value};
  margin: 0;
  cursor: pointer`;

const Button = styled.button`
color: var(--Component-colors-Components-Buttons-Tertiary-color-button-tertiary-color-fg, #D1D1D6);
background: ${(props) => props.theme.colors.background['bg-primary'].value};
border: none;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 20px; /* 142.857% */

`

const CheckInput = () => {
  return (
    // <Wrapper>
    <CheckboxContainer>
        <Input type='checkbox'/>
        <StyledParagraph>Remember for 30 days</StyledParagraph>
      <Button>Forgot password</Button>
      {/* </Wrapper>  */}
      </CheckboxContainer>
  );
};

export default CheckInput;
