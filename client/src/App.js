
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {themeSettings} from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/debdash";
import Companies from "scenes/companies";
import Branches from "scenes/branches";
import Licenses from "scenes/licenses";
import Users from "scenes/users";
import MobileConnection from "scenes/mobile-connection";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'


i18next.init({
  interpolation: {escapeValue: false},
});

function App() {
 

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
          <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Navigate to="/debdash" replace />} />
                    <Route path="/debdash/*" element={<Dashboard />} />
                    <Route path="/companies/*" element={<Companies />} />
                    <Route path="/branches/*" element={<Branches />} />
                    <Route path="/licenses/*" element={<Licenses />} />
                    <Route path="/users/*" element={<Users />} />
                    <Route path="/mobile-connection/*" element={<MobileConnection />} />
                  </Route>
                </Routes>
              </LocalizationProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </BrowserRouter>        
      </I18nextProvider>
    </div>
  );
}

export default App;
