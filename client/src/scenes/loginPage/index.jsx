import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { setMode } from "../../state/index";
import { tokens } from "../../theme.js";
import { Link } from 'react-router-dom';


const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  setMode('dark');
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Box
        width="100%"
        p={{ xs: '1rem 2%', md: '1rem 6%' }}
        textAlign="center"
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.background.alt} 100%)`,
        }}
      >
        <Typography fontWeight="bold" fontSize="32px" color={theme.palette.secondary.main}>
          Tableau de bord pour WeBank
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p={{ xs: '1rem', md: '2rem' }}
        m="2rem auto"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.alt}
        boxShadow="0px 3px 15px rgba(0, 0, 0, 0.1)"
        display="flex"
        flexDirection="column"
      >
        <Typography fontWeight="500" variant="h5" color={theme.palette.secondary.main} sx={{ mb: "1.5rem" }}>
          Connectez-vous avec votre compte!
        </Typography>
        <Form />
        <Typography fontWeight="500" variant="h5" color={colors.blueAccent[700]} sx={{ mt: "1.5rem" }}>
          <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'inherit' }}>
            Mot de passe oublié?
          </Link>
        </Typography>
        <Typography fontWeight="500" variant="h5" color={colors.blueAccent[700]} sx={{ mt: "1.5rem" }}>
          <Link to="/signup" style={{ textDecoration: 'none',   color: 'inherit' }}>
            Vous n'avez pas un compte? S'inscrire ici!
          </Link>
        </Typography>

      </Box>
    </Box>
  );
};

export default LoginPage;
