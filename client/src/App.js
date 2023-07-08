import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import LoginPage from "./scenes/loginPage";
import Signup from "./scenes/signUp";
import Clients from "./scenes/clients";
import Admin from "./scenes/admin";
import Virement from "./scenes/virement";
import Chequier from "./scenes/chequier";
import Credit from "./scenes/credits";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.global.token));
  console.log("🚀 ~ file: App.js:19 ~ App ~ state.global.token:", useSelector((state) => state.global.token))
  console.log("🚀 ~ file: App.js:19 ~ App ~ isAuth:", isAuth)
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {!isAuth && <Route path="/" element={<LoginPage />} />}
            {!isAuth && <Route path="/signup" element={<Signup />} />}

            {isAuth &&<Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/virements" element={<Virement />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/chequier" element={<Chequier />} />
                <Route path="/credits" element={<Credit />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Route>
            }
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
