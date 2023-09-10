import React, { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, Select, MenuItem } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { useGetAllAgenciesQuery } from "../../state/api";
import { tokens } from "../../theme.js";
import Alert from "@mui/material/Alert";
import axios from "axios";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});



const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
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

  const login = async (values, onSubmitProps) => {
    console.log(values)
    
    const res = await axios
      .post("http://localhost:5001/auth", {
        email: values.email,
        password: values.password
      })
      .catch((err) => {
        const serverError = err.response.data.msg;
        console.log("🚀 ~ file: Form.jsx:71 ~ register ~ err:", err)
        console.log("🚀 ~ file: Form.jsx:71 ~ register ~ serverError:", serverError)
        setRegistrationError(serverError);
        setShowAlert(true)
      });

    
    const loggedIn = await res.data;
    console.log("🚀 ~ file: Form.jsx:49 ~ login ~ loggedIn:", loggedIn);
    
    
      
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/dashboard");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
  };

  // const agencies = useGetAllAgenciesQuery();

  return (
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
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />

<Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                mb: "1rem"
              }}
              
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            
          </Box>
          </Box>

          {showAlert && (
            <Alert severity="error">
            {registrationError
              ? registrationError
              : "An error occurred while registering. Please check your inputs and try again."}
          </Alert>
          
          )}
          
        </form>
      )}
    </Formik>
  );
};

export default Form;
