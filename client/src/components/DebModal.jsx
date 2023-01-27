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
  useTheme
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
  const theme = useTheme();
  const handleAction = (fn) => {
    if (typeof fn === "function") {
      setLoading(true);
      Promise.resolve(fn())
        .then(() => {
          if (isFunction(onResponse)) onResponse();
        })
        .finally(() => {
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
      {...props}>
      {isFunction(onClose) && (
        <Box sx={{ position: "relative" }}>
          <Box sx={{ position: "absolute", right: "0px", padding: "0.2rem" }}>
            <IconButton onClick={() => handleAction(onClose)} size="small" sx={{m:0.8}} >
              <Close fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      )}
      {headerText && (
        <DialogTitle sx={{ fontFamily:'Inter Tight', fontSize: "1.7rem", padding: "1rem 1rem 0.7rem 1.5rem", fontWeight:"100", textAlign:"center", textTransform: "uppercase"}}>{headerText}</DialogTitle>
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
              onClick={() => handleAction(onReject)}
              color="error">
              {rejectText}
            </Button>
          )}
          {isFunction(onConfirm) && (
            <Button
              variant={confirmButtonVariant}
              onClick={() => handleAction(onConfirm)}
              disabled={loading}
              color="success">
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
  /**  Callback cuando se presiona el botón de curz o haciendo click fuera del modal */
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