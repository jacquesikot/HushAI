import React from "react";
import styled, {css} from "styled-components";

interface ButtonProps {
  label: string;
  width?: number | string;
  height?: number | string;
  type: "primary" | "secondary" | "error";
  style?: React.CSSProperties;
  isLoading?: boolean;
  isLoadingText?: string;
  onClick?: (e: any) => void;
  icon?: React.ReactNode;
  // disabled?: boolean;
  // disableRipple?: boolean;
}

const Wrapper = styled.div``;

const NewButton = styled.button<{
  width?: number | string;
  type: "primary" | "secondary" | "error";
}>`
  width: ${(props) => props.width + "px" || "100%"};
  display: flex;
  padding: 10px ${(props) => props.theme.spacing["spacing-xl"].value};
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.radius["radius-md"].value};
  border: 1px solid
    ${(props) =>
      props.theme.componentColors.components.buttons.primary[
        "button-primary-border"
      ].value};
  background: ${(props) =>
    props.theme.componentColors.components.buttons.primary["button-primary-bg"]
      .value};
  /* Shadows/shadow-xs */
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: ${(props) =>
    props.theme.componentColors.components.buttons.primary["button-primary-fg"]
      .value};

      ${(props) =>
        props.type === "secondary" &&
        css`
        border: 1px solid ${(props) => props.theme.colors.border["border-primary"].value};
        background: ${(props) => props.theme.colors.background["bg-primary"].value};
        color: ${(props) => props.theme.colors.text["text-secondary-(700)"].value}
        `}
`;

const Button = ({
  label,
  width,
  height,
  type,
  style,
  onClick,
  isLoading,
  isLoadingText = "Loading...",
  icon,
  // disabled,
  // disableRipple,
}: ButtonProps) => {
  return (
    <Wrapper>
      <NewButton type={type} width={width}>{icon && <span style={{ marginRight: 8 }}>{icon}</span>}
        {isLoading ? isLoadingText : label}</NewButton>
    </Wrapper>
  );
};

export default Button;
