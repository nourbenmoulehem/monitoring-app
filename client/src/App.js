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
import Cards from "scenes/Cards";
import ActivationPage from "components/ActivationPage";
import axios from "axios";
import { setLogin, setLogout } from "./state/index";
import PasswordReset from "components/PasswordReset";
import ForgetPasswored from "components/ForgetPassword";
import Chat from "scenes/Chat";
axios.defaults.withCredentials = true;


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // const isAuth = Boolean(useSelector((state) => state.global.token));
  const isAuth = Boolean(useSelector((state) => state.global.isLoggedIn));
  console.log("🚀 ~ file: App.js:19 ~ App ~ state.global.user:", useSelector((state) => state.global.user))
  console.log("🚀 ~ file: App.js:19 ~ App ~ state.global.token:", useSelector((state) => state.global.token))
  console.log("🚀 ~ file: App.js:19 ~ App ~ isAuth:", isAuth)

  const userRoles = useSelector((state) => state.global.user?.role || []);
  console.log("🚀 ~ file: App.js:32 ~ App ~ userRoles:", userRoles)
  const isAdmin = userRoles.includes("superadmin");
  console.log("🚀 ~ file: App.js:34 ~ App ~ isAdmin:", isAdmin)
  const isToken = Boolean(useSelector((state) => state.global.token));
  console.log("🚀 ~ file: App.js:37 ~ App ~ isToken:", isToken)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hi");
    const validateToken = async () => {
      try {
        console.log("hi");
        const response = await axios.get("http://localhost:5001/auth/user");
        const { token, user } = response.data;
        console.log("🚀 ~ file: App.js:48 ~ validateToken ~ user:", user)
        
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
            <Route path="/confirm/:activationCode" element={<ActivationPage />} />
            <Route path="/forgot-password" element={<ForgetPasswored />} />
            <Route path="/reset-password/:id/:token" element={<PasswordReset />} />

            {isAuth &&<Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/virements" element={<Virement />} />
                {isAdmin && <Route path="/users" element={<Admin />} />}
                <Route path="/chequier" element={<Chequier />} />
                <Route path="/credits" element={<Credit />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            }
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;