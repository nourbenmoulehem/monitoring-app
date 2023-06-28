import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./scenes/layout";
import Dashboard from "./scenes/dashboard";
import LoginPage from "./scenes/loginPage";
import Signup from "./scenes/signUp";
import Clients from "./scenes/clients"
// import Products from "scenes/products";
// import Customers from "scenes/customers";
// import Transactions from "scenes/transactions";
// import Geography from "scenes/geography";
// import Overview from "scenes/overview";
// import Daily from "scenes/daily";
// import Monthly from "scenes/monthly";
// import Breakdown from "scenes/breakdown";
import Admin from "./scenes/admin";
// import Performance from "scenes/performance";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.global.token));
  console.log("🚀 ~ file: App.js:26 ~ App ~ isAuth:", isAuth)
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route element={<Layout />}>
              <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/" />} />
              <Route path = "/clients" element={isAuth ? <Clients /> : <Navigate to="/" />}/>
              <Route path = "/admin" element={isAuth ? <Admin /> : <Navigate to="/" />}/>
              
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;