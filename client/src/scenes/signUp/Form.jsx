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
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  agency: yup.string().required("required"),
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
        password: values.password,
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
    console.log("🚀 ~ file: Form.jsx:87 ~ handleFormSubmit ~ values:", values)
    // // console.log("hiiii")
    // // values.agency = selectedAgency
    // // console.log("🚀 ~ file: Form.jsx:89 ~ handleFormSubmit ~ selectedAgency:", selectedAgency)
    register(values, onSubmitProps).then(() => navigate("/"));
    // // console.log("🚀 ~ file: Form.jsx:67 ~ handleFormSubmit ~ values:", values);
    // console.log("selectedAgency:", selectedAgency);
    
    // console.log(values)
  };
    
  const handleChange = (event) => {
    setSelectedAgency(event.target.value); // Update selectedAgency state with the selected value
  };

  const curr = useGetAllAgenciesQuery();
  const agencies = curr.data;
  console.log("🚀 ~ file: Form.jsx:99 ~ Form ~ agencies:", agencies)

  return (
    <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                name="occupation"
                error={!!touched.occupation && !!errors.occupation}
                helperText={touched.occupation && errors.occupation}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password" // Set the type prop to "password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              {agencies && (
              <Select
              fullWidth
              value={values.agency}
              onChange={handleChange}
              onBlur={handleBlur}
              name="agency"
              error={touched.agency && !!errors.agency}
              sx={{ gridColumn: 'span 4' }}
            >
              <MenuItem value="">Select an agency</MenuItem>
              {agencies.map((agency) => (
                <MenuItem key={agency._id} value={agency._id}>
                  {agency.name}
                </MenuItem>
              ))}
            </Select>
            )}
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
  )
}
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  occupation: yup.string().required("required"),
  location: yup.string().required("required"),
  password: yup.string().required("required"),
  agency: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  location: "",
  occupation: "",
  password: "",
  agency: "", 
};

export default Form;
