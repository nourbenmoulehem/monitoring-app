import React, { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, Select, MenuItem } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import { tokens } from "theme.js";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Link } from 'react-router-dom';


const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email")
    .required("required")
});



const initialValuesLogin = {
  email: "",

};

const ForgetPasswored = () => {
  const [pageType, setPageType] = useState("login");
  // const [selectedAgency, setSelectedAgency] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showAlert, setShowAlert] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const login = async (values, onSubmitProps) => {
    console.log("🚀 ~ file: ForgetPassword.jsx:44 ~ login ~ values:", values)

    
    const res = await axios
      .post("http://localhost:5001/auth/forgetPassword", {
        email: values.email,
      })
      .catch((err) => {
        const serverError = err.response.data.msg;
        console.log("🚀 ~ file: Form.jsx:71 ~ register ~ err:", err)
        console.log("🚀 ~ file: Form.jsx:71 ~ register ~ serverError:", serverError)
        setRegistrationError(serverError);
        setShowAlert(true)
      });
    console.log("🚀 ~ file: ForgetPassword.jsx:59 ~ login ~ res:", res)

    if (res && res.status === 200) {
      // If the request is successful, set the success message
      setSuccessMessage(res.data.msg);
    }


    
    
    
    
      
    onSubmitProps.resetForm();
   
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
  };


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
          Password reset
        </Typography>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />


          </Box>
          <Box display="flex" justifyContent="end" mt="20px" mb = "1.5rem">
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          {showAlert && (
            <Alert severity="error">
            {registrationError
              ? registrationError
              : "An error occurred while registering. Please check your inputs and try again."}
          </Alert>
          
          )}

          {successMessage && (
                  // Display the success message in an Alert component
                  <Alert  severity="success">{successMessage}</Alert>
          )}
          
        </form>
      )}
    </Formik>

    <Typography fontWeight="500" variant="h5" color={colors.blueAccent[700]} sx={{ mt: "1.5rem" }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Go back to Sign-in?
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgetPasswored;
