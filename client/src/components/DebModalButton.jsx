import { Button } from '@mui/material'
import React, { useState } from 'react'
import DebModal from './DebModal'

export default function DebModalButton({buttonText, children, modalProps}) {
  const [open, setOpen] = useState(false);
  const handleClose = () =>{
    if(typeof modalProps.onClose === "function") modalProps.onClose();
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }
  return (
    <> 
    <Button variant="contained" onClick={handleOpen}>
      {buttonText}
    </Button>
    <DebModal
      open={open}
      onClose={handleClose}
      {...modalProps}
      >
        {children}
      </DebModal>
    </>
  )
}
