import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Button } from "@mui/material";
import Form from "./Form";
import NavbarLogin from 'components/NavBarLogin';
import { setMode } from "../../state/index";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  setMode('dark');

  return (
    
    <Box>
      {/* <NavbarLogin /> */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.background.alt} 100%)`,
        }}
      >
        <Typography fontWeight="bold" fontSize="32px" color={theme.palette.secondary.main}>
        Tableau de bord pour We Bank
        </Typography>
        
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        // Change the background color to a darker shade
        backgroundColor={theme.palette.background.alt}
        sx={{
          boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.1)",
        }}
        display="flex"
        flexDirection="column"
      >
        <Typography fontWeight="500" variant="h5" color={theme.palette.secondary.main} sx={{ mb: "1.5rem" }}>
        Connectez-vous avec votre compte!
        </Typography>
        <Form />
        {/* <Button variant="contained" color="primary" sx={{ mt: "1rem" }}>
          Sign In
        </Button> */}
      </Box>
    </Box>
  );
};

export default LoginPage;
