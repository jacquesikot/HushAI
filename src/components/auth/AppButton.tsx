import { CircularProgress, Button as MuiButton } from '@mui/material';
import { ReactNode } from 'react';
import { useTheme } from 'styled-components';

interface ButtonProps {
  label: string;
  width?: number | string;
  height?: number | string;
  // type: 'primary' | 'secondary' | 'error';
  type: 'primary' | 'secondary';
  icon?: ReactNode;
  style?: React.CSSProperties;
  isLoading?: boolean;
  isLoadingText?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
  disableRipple?: boolean;
}

const AppButton = ({
  label,
  width,
  height = 40,
  type,
  icon,
  style,
  onClick,
  isLoading,
  isLoadingText = 'Loading...',
  disabled,
  disableRipple,
}: ButtonProps) => {
  const theme = useTheme();
  const disabledColor = theme.componentColors.components.buttons.primary['button-primary-fg'].value;
  const returnButtonColors = () => {
    if (type === 'primary') {
      return {
        bg: disabled ? disabledColor : theme.componentColors.components.buttons.primary['button-primary-bg'].value,
        hover: disabled
          ? disabledColor
          : theme.componentColors.components.buttons.primary['button-primary-bg_hover'].value,
        active: disabled ? disabledColor : theme.componentColors.components.buttons.primary['button-primary-bg'].value,
        text: theme.componentColors.components.buttons.primary['button-primary-fg'].value,
      };
    }
    if (type === 'secondary') {
      return {
        bg: disabled ? '#EEE' : 'transparent',
        hover: disabled
          ? '#EEE'
          : theme.componentColors.components.buttons.secondary['button-secondary-bg_hover'].value,
        active: disabled ? '#EEE' : theme.componentColors.components.buttons.secondary['button-secondary-bg'].value,
        text: theme.componentColors.components.buttons.secondary['button-secondary-fg'].value,
      };
    }
    // if (type === 'error') {
    //   return {
    //     bg: disabled ? '#A66' : '#D92D20',
    //     hover: disabled ? '#A66' : '#D32F2F',
    //     active: disabled ? '#A66' : '#B71C1C',
    //     text: 'white',
    //   };

    return {
      bg: disabled ? disabledColor : theme.componentColors.components.buttons.primary['button-primary-bg'].value,
      hover: disabled
        ? disabledColor
        : theme.componentColors.components.buttons.primary['button-primary-bg_hover'].value,
      active: disabled ? disabledColor : theme.componentColors.components.buttons.primary['button-primary-bg'].value,
      text: theme.componentColors.components.buttons.primary['button-primary-fg'].value,
    };
  };

  return (
    <MuiButton
      startIcon={
        isLoading ? <CircularProgress sx={{ color: returnButtonColors().text }} size={20} thickness={2} /> : icon
      }
      onClick={onClick}
      disabled={disabled}
      disableRipple={disableRipple}
      style={style}
      sx={{
        width,
        height,
        borderRadius: '8px',
        bgcolor: returnButtonColors().bg,
        border: `${type === 'primary' ? '0' : '1.5'}px solid #D0D5DD`,
        color: returnButtonColors().text,
        fontWeight: 500,
        fontSize: 15,
        letterSpacing: '0.02em',
        textTransform: 'none',
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 2,
        paddingBottom: 2,
        transition: 'background-color 0.3s',
        '&:hover': {
          bgcolor: disabled ? returnButtonColors().bg : returnButtonColors().hover,
        },
        '&:active': {
          bgcolor: disabled ? returnButtonColors().bg : returnButtonColors().active,
        },
      }}
    >
      {isLoading ? isLoadingText : label}
    </MuiButton>
  );
};

export default AppButton;
