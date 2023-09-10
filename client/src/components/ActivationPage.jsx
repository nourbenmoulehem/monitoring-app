import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button
} from "@mui/material";
import { setMode } from "state/index";
import { tokens } from "theme.js";
import { Link } from 'react-router-dom';

function ActivationPage() {
  const { activationCode } = useParams();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const colors = tokens(theme.palette.mode);

  // Set the theme mode to 'dark' (you may want to move this to a useEffect)
  useEffect(() => {
    setMode('dark');
  }, []);

  // Send a POST request to verify the user upon component mount
  useEffect(() => {
    async function verifyUser() {
      try {
        await axios.post(`http://localhost:5001/auth/verifyuser/${activationCode}`);
      } catch (error) {
        // Handle any errors if needed
        console.error("Error verifying user:", error);
      }
    }

    // Call the verifyUser function
    verifyUser();
  }, [activationCode]);

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
        alignItems="center" // Center text horizontally
      >
        <Typography fontWeight="bold" variant="h5" color={theme.palette.secondary.main} sx={{ mb: "1.5rem" }}>
          Your account has been activated
        </Typography>
        <Button component={Link} to="/" color="secondary" variant="contained">
          Go to Login
        </Button>
      </Box>
    </Box>
  );
}

export default ActivationPage;
