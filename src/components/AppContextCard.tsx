import { Box, Typography } from '@mui/material';

const AppContextCard = (props: { name: string; description: string; handleClick: () => void }) => {
  return (
    <Box
      onClick={props.handleClick}
      sx={{
        border: '1px solid black',
        padding: '10px',
        margin: '10px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
      }}
    >
      <Typography sx={{ fontSize: 14 }}>{props.name}</Typography>
      <Typography sx={{ fontSize: 12 }}>{props.description}</Typography>
    </Box>
  );
};

export default AppContextCard;
