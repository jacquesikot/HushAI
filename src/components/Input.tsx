import { LightTheme } from '@/theme/types';
import { InputBase, InputBaseProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ButtonProps extends InputBaseProps {
  apptheme: LightTheme;
}

const Input = styled(InputBase)((props: ButtonProps) => ({
  width: '100%',
  'label + &': {
    marginTop: props.apptheme.spacing['spacing-sm'].value,
  },
  color: props.apptheme.colors.text['text-placeholder'].value,
  '& .MuiInputBase-input': {
    borderRadius: 6,
    position: 'relative',
    backgroundColor: props.apptheme.colors.background['bg-primary'].value,
    border: `1px solid ${props.apptheme.colors.border['border-primary'].value}`,
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',
    padding: '10px 26px 10px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: props.apptheme.componentColors.components.buttons.primary['button-primary-bg'].value,
      boxShadow: '0 0 0 0.2rem rgba(16, 24, 40, 0.05)',
    },
  },
  '& .Mui-error': {
    // backgroundColor: theme.palette.background.paper,
    border: '1px solid red',
  },
}));

export default Input;
