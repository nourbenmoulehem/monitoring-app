import React, { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Calendar from "./scenes/monthly";
import axios from "axios";
import { setLogin, setLogout } from "./state/index";
axios.defaults.withCredentials = true;


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // const isAuth = Boolean(useSelector((state) => state.global.token));
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log("🚀 ~ file: App.js:19 ~ App ~ state.global.user:", useSelector((state) => state.global.user))
  console.log("🚀 ~ file: App.js:19 ~ App ~ state.global.token:", useSelector((state) => state.global.token))
  console.log("🚀 ~ file: App.js:19 ~ App ~ isAuth:", isAuth)

  const userRoles = useSelector((state) => state.global.user?.role || []);
  console.log("🚀 ~ file: App.js:32 ~ App ~ userRoles:", userRoles)
  const isAdmin = userRoles.includes("superadmin");
  console.log("🚀 ~ file: App.js:34 ~ App ~ isAdmin:", isAdmin)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hi");
    const validateToken = async () => {
      try {
        console.log("hi");
        const response = await axios.get("http://localhost:5001/auth/user");
        const { token, user } = response.data;
        
        if (token) {
          // Refresh the token if it exists
          const refreshResponse = await axios.get("http://localhost:5001/auth/refresh", {
            withCredentials: true,
          });
          
          const { token: refreshedToken } = refreshResponse.data;
          
          dispatch(setLogin({ user, token: refreshedToken }));
        } else {
          dispatch(setLogout());
        }
      } catch (error) {
        console.error("Error validating token:", error);
        dispatch(setLogout());
      }
    };

    validateToken();
  }, [dispatch]);
  


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
                {isAdmin && <Route path="/admin" element={<Admin />} />}
                <Route path="/chequier" element={<Chequier />} />
                <Route path="/credits" element={<Credit />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/calendar" element={<Calendar />} />
              </Route>
            }
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;