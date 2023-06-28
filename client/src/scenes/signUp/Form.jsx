import React, { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme, Select, MenuItem } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { json, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { useGetAllAgenciesQuery } from "../../state/api";
import axios from "axios";

const registerSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email("invalid email"),
  password: yup.string(),
  location: yup.string(),
  occupation: yup.string(),
  agency: yup.string(),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  agency: "", 
};


const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [selectedAgency, setSelectedAgency] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    
    // const formData = new FormData();
    console.log("values in register")
    console.log(values)
    console.log("hello register!")
    // for (let value in values) {
    //   formData.append(value, values[value]);
    // }

    const res = await axios
      .post("http://localhost:5001/auth/register", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        agency: values.agency,
        location: values.location,
        occupation: values.occupation
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log("🚀 ~ file: Form.jsx:67 ~ register ~ data:")
    
  //   const savedUserResponse = await fetch("http://localhost:5001/auth/register", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(values),
  // });

    
    // const savedUser = await savedUserResponse.json();
    // console.log("🚀 ~ file: Form.jsx:58 ~ register ~ savedUser:", savedUser);
    

    onSubmitProps.resetForm();
    
  };


  const handleFormSubmit = async (values, onSubmitProps) => {
    values.agency = selectedAgency
    register(values, onSubmitProps).then(() => navigate("/"));
    // console.log("🚀 ~ file: Form.jsx:67 ~ handleFormSubmit ~ values:", values);
    // console.log("selectedAgency:", selectedAgency);
    
    // console.log(values)
  };
    


  const agencies = useGetAllAgenciesQuery();

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
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
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
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
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  {agencies.data && (
                    <Select
                      fullWidth
                      value={selectedAgency}
                      onChange={(event) => setSelectedAgency(event.target.value)}
                      onBlur={handleBlur}
                      name="agency"
                      error={Boolean(touched.agency) && Boolean(errors.agency)}
                      sx={{ gridColumn: "span 4" }}
                    >
                      <MenuItem value="">Select an agency</MenuItem>
                      {agencies.data.map((agency) => (
                        <MenuItem key={agency._id} value={agency._id}>
                          {agency.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </Box>

            
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
            {/* CONFIRM PASSWORD */}
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              
            >
              REGISTER
            </Button>
            <Typography
              onClick={() => {
                setPageType("register");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              Already have an account? Login here.
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
