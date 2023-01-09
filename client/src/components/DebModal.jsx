import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Close } from "@mui/icons-material";
import {
  CircularProgress,
  Divider,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";

/**
 * Componente para mostrar un modal con contenido.
 */
function DebModal({
  children,
  confirmText = "Aceptar",
  rejectText = "Cancelar",
  headerText,
  contentText,
  onClose,
  onConfirm,
  onReject,
  onResponse,
  rejectButtonVariant,
  confirmButtonVariant = "contained",
  ...props
}) {
  const [loading, setLoading] = React.useState(false);
  const handleAction = (fn) => {
    if (typeof fn === "function") {
      setLoading(true);
      Promise.resolve(fn())
        .then((result) => {
          if (isFunction(onResponse)) onResponse();
        })
        .finally((result) => {
          setLoading(false);
        });
    }
  };

  const isFunction = (fn) => typeof fn === "function";

  return (
    <Dialog
      sx={{
        "& .MuiDialog-container": {
          alignItems: "flex-start",
        },
      }}
      onClose={() => handleAction(onClose)}
      // fullWidth={true}
      // maxWidth={"md"}
      {...props}>
      {isFunction(onClose) && (
        <Box sx={{ position: "relative" }}>
          <Box sx={{ position: "absolute", right: "0px", padding: "0.2rem" }}>
            <IconButton onClick={() => handleAction(onClose)} size="small">
              <Close fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      )}
      {headerText && (
        <DialogTitle sx={{ fontSize: "1.5rem" }}>{headerText}</DialogTitle>
      )}
      <Divider />
      <DialogContent>
        {contentText && <DialogContentText>{contentText}</DialogContentText>}
        {children}
      </DialogContent>
      {(isFunction(onReject) || isFunction(onConfirm)) && (
        <DialogActions>
          {isFunction(onReject) && (
            <Button
              variant={rejectButtonVariant}
              onClick={() => handleAction(onReject)}>
              {rejectText}
            </Button>
          )}
          {isFunction(onConfirm) && (
            <Button
              variant={confirmButtonVariant}
              onClick={() => handleAction(onConfirm)}>
              {confirmText}
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Button>
          )}
        </DialogActions>
      )}
      {loading && <LinearProgress />}
    </Dialog>
  );
}

DebModal.propTypes = {
  /**  Nodos hijos para mostarar en el modal */
  children: PropTypes.node,
  /**  Texto del botón de confirmación */
  confirmText: PropTypes.string,
  /**  Texto del botón de anulación */
  rejectText: PropTypes.string,
  /**  Texto de encabezado */
  headerText: PropTypes.string,
  /**  Texto de contenido */
  contentText: PropTypes.string,
  /**  Callback cuando el modal se cierra por el botón de curz o haciendo click fuera del modal */
  onClose: PropTypes.func.isRequired,
  /** Callback cuando se presiona el botón de confirmación
   * Si devuelve una promesa, muestra spinner de loading
   * hasta que la promesa se resuelva o se rechace.
   * Si no esta presente el botón de confirmación no se muestra*/
  onConfirm: PropTypes.func,
  /** Callback cuando se presiona el botón de rechazar.
   * Si no esta definido el botón de anulación no se muestra.
  */
  onReject: PropTypes.func,
  /** Callback cuando la promesa devuelta en onConfirm se resuelve o se rechaza */
  onResponse: PropTypes.func,
  /** Variante del botón de anulación */
  rejectButtonVariant: PropTypes.string,
   /** Variante del botón de confirmación */
  confirmButtonVariant: PropTypes.string,
  /** El resto de los props son pasados al componente Dialog de mui */
};
export default DebModal;