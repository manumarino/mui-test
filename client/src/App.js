import { LayersOutlined } from "@mui/icons-material";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {themeSettings} from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/debdash";
import Products from "scenes/companies";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/debdash" replace />} />
            <Route path="/debdash" element={<Dashboard />} />
            <Route path="/companies" element={<Products />} />


          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
