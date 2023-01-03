import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Close } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import { Box } from "@mui/system";

export default function DebModal({
  open,
  onClose,
  children,
  confirmText,
  rejectText,
  headerText,
  contentText,
  onConfirm,
  onReject,
  rejectButtonVariant,
  confirmButtonVariant = "contained"
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={'md'}>
      <Box sx={{position: "relative"}}>
        <Box sx={{position: "absolute", right: "0px", padding: "0.5rem"}}>
      <IconButton onClick={()=>{onReject();onClose();}} size="small">
        <Close fontSize="inherit"/>
      </IconButton>
        </Box>
      </Box>
      {headerText && <DialogTitle sx={{fontSize: "1.5rem"}}>{headerText}</DialogTitle>}
      <Divider/>
      <DialogContent>
        {contentText && <DialogContentText>{contentText}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        <Button variant={rejectButtonVariant} onClick={()=>{onReject();onClose();}}>{rejectText || "Cancelar"}</Button>
        <Button variant={confirmButtonVariant} onClick={()=>{onConfirm();onClose();}}>{confirmText || "Aceptar"}</Button>
      </DialogActions>  
    </Dialog>
  );
}
