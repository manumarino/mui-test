import { Button } from '@mui/material'
import React, { useState } from 'react'
import DebModal from './DebModal'

export default function DebModalButton({buttonText, children, modalProps}) {
  const [open, setOpen] = useState(false);
  const handleClose = () =>{
    if(modalProps.onClose) modalProps.onClose();
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
      onConfirm={modalProps.onConfirm}
      onReject={modalProps.onReject}
      confirmText={modalProps.confirmText}
      rejectText={modalProps.rejectText}
      headerText={modalProps.headerText}
      contentText={modalProps.contentText}
      >
        {children}
      </DebModal>
    </>
  )
}
