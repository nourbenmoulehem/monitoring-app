import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { Link } from 'react-router-dom';
import { tokens } from "../../theme.js";



function Signup() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
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
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
        </Typography>
        <Form />
        <Typography fontWeight="500" variant="h5" color={colors.blueAccent[700]} sx={{ mt: "1.5rem" }}>
          <Link to="/" style={{ textDecoration: 'none',   color: 'inherit' }}>
            Already have an account? Sign in here
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default Signup