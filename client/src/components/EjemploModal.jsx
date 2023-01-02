import {  Button, Modal,  styled, Typography } from '@mui/material'
import React, { useState } from 'react';
import {Box} from "@mui/system";

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FlexBetween from './FlexBetween';

const StyledModal = styled(Modal)({
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
})

function EjemploModal(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip 
      onClick={(e)=>setOpen(true)}
      title="Delete"
      sx={{
        position: "fixed",
      }}
      >
        <IconButton>
        <DeleteIcon />
      </IconButton>
        
      </Tooltip>
      <StyledModal
          open={open}
          onClose={(e)=>setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box 
          width={400}
          height={200}
          bgcolor="black"
          p={3}
          borderRadius={3}
          display="flex"          
          flexDirection="column"
          justifyContent="space-between"
          >
              <Typography variant="h6" color="white" textAlign="center">
                Desea borrar {props.elementoABorrar} ?
                <br />
                Se borrará: {props.cuando}
              
              </Typography> 
              <Box
              display="flex"
              justifyContent="flex-end"
              >
                <Button                
                sx={{ mx: "1rem" }}  variant="outlined" color="error">
                  Volver
                </Button>
                <Button variant="contained" color="success">
                  Confirmar
                </Button>
              </Box>             
              
          </Box>
      </StyledModal>
    </>
  )
}

export default EjemploModal
