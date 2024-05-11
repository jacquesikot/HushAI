import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useContextQuery from '@/hooks/useContextQuery';
import { CircularProgress, Grid } from '@mui/material';
import AppContextCard from './AppContextCard';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ChooseContextModal(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddContext: (context: any) => Promise<void>;
  isLoading: boolean;
}) {
  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);
  const { appContexts } = useContextQuery();

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {props.isLoading ? (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select a context
            </Typography>

            <Grid container>
              {appContexts.data?.map((context: any) => (
                <Grid item xs={12} key={context.id}>
                  <AppContextCard
                    name={context.name}
                    description={context.description}
                    handleClick={() => props.handleAddContext(context)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Modal>
    </div>
  );
}
