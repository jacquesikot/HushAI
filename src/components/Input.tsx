import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  'label + &': {
    marginTop: theme.spacing(3),
  },
  color: '#70707B',
  '& .MuiInputBase-input': {
    borderRadius: 6,
    position: 'relative',
    backgroundColor: '#131316',
    border: '1px solid #3F3F46',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '24px',
    padding: '10px 26px 10px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#7F56D9',
      boxShadow: '0 0 0 0.2rem rgba(16, 24, 40, 0.05)',
    },
  },
  '& .Mui-error': {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid red',
  },
}));

export default BootstrapInput;
