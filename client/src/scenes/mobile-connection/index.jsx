import * as React from 'react';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/material';


const MobileConnection = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
      enqueueSnackbar('I love hooks');
  };

  return (
      <Button onClick={handleClick}>Show snackbar</Button>
  );
}

export default MobileConnection;


