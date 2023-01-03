import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  useTheme,
  Tab,
  Tabs,
  TabPanel,
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DebModalButton from "components/DebModalButton";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CheckBox } from "@mui/icons-material";

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChange = (event, tabIndex) => {
    setCurrentTab(tabIndex);
  };
  return (
    <Box sx={{ m: "2rem" }}>
      <Box>Dash</Box>

      <Box>
        <Stack spacing={2} direction="row">
          <DebModalButton
            buttonText="deb modal button"
            modalProps={{
              onConfirm: () => console.log("onConfirm"),
              onReject: () => console.log("onReject"),
              confirmText: "Confirmar",
              rejectText: "Cancelar",
              headerText: "Titulo del Modal",
              contentText: "Esto es el content text",
            }}>
            <div>Esto esta en un div</div>
            <div>Este es otro div</div>
            <div>
              este es un tercer div, puede haber cualquier cosa aca adentro
            </div>
            <div>Aca podemos mandar un formulario</div>
          </DebModalButton>
          <DebModalButton
            buttonText="Crear Compañía"
            modalProps={{
              onConfirm: () => console.log("onConfirm"),
              onReject: () => console.log("onReject"),
              confirmText: "Confirmar",
              rejectText: "Cancelar",
              headerText: "Crear Compañía",
            }}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={currentTab} onChange={handleChange}>
                  <Tab label="Datos Generales" />
                  <Tab label="Conexión con debQ" />
                  <Tab label="Imágenes " />
                </Tabs>
              </Box>
              <Box sx={{ paddingTop: "1rem" }} hidden={!(currentTab === 0)}>
                <Grid2 container spacing={2}>
                  <Grid2 xs={12} sm={6} md={3}>
                    <TextField
                      sx={{ width: "100%" }}
                      id="Name"
                      label="Nombre"
                      variant="outlined"
                    />
                  </Grid2>
                  <Grid2 xs={12} sm={6} md={3}>
                    <TextField
                      sx={{ width: "100%" }}
                      id="Domain"
                      label="Dominio"
                      variant="outlined"
                    />
                  </Grid2>
                  <Grid2 xs={12} sm={6} md={3}>
                    <TextField
                      sx={{ width: "100%" }}
                      id="Extension"
                      label="Extension"
                      variant="outlined"
                    />
                  </Grid2>
                  <Grid2 xs={12} sm={6} md={3}>
                    <TextField
                      sx={{ width: "100%" }}
                      id="TimeZone"
                      label="Zona horaria"
                      variant="outlined"
                    />
                  </Grid2>
                  <Grid2 xs={12} sm={6} md={3}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Habilitar Captcha"
                      />
                    </FormGroup>
                  </Grid2>
                  <Grid2 xs={12} sm={6} md={3}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Google Analytics"
                      />
                    </FormGroup>
                  </Grid2>
                </Grid2>
              </Box>
              <Box hidden={!(currentTab === 1)}>Item Two</Box>
              <Box hidden={!(currentTab === 2)}>Item Three</Box>
            </Box>
          </DebModalButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
