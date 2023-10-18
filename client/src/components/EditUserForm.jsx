  import React, { useEffect, useState } from "react";
  import FlexBetween from "./FlexBetween";
  import { Formik } from "formik";
  import * as yup from "yup";
  // import Header from "./Header";
  // import {
  //   DownloadOutlined,
  //   Email,
  //   PointOfSale,
  //   PersonAdd,
  //   Traffic,
  // } from "@mui/icons-material";
  import {
    Box,
    TextField,
    Button,
    Typography,
    useMediaQuery,
    Select,
    MenuItem,
  } from "@mui/material";
  // import { tokens } from "../theme.js";
  import { useGetAllAgenciesQuery } from "../state/api.js";
  import { useGetUserQuery } from "../state/api.js";
  import axios from "axios";
  import SelectedRowsTable from "./selectedRows";

  const EditUserForm = (props) => {
    const {  selectedRows, isUpdate } = props;
    console.log("🚀 ~ file: EditUserForm.jsx:30 ~ EditUserForm ~ isUpdate:", isUpdate)
    console.log(
      "🚀 ~ file: editUserForm.jsx:27 ~ EditUserForm ~ selectedRows._id:",
      selectedRows._id)
      console.log("🚀 ~ file: EditUserForm.jsx:34 ~ EditUserForm ~ selectedRows:", selectedRows)
  
    // const [userRecords, setUserRecords] = useState([]);

    const { data } = useGetUserQuery(selectedRows._id);
    console.log("🚀 ~ file: editUserForm.jsx:31 ~ EditUserForm ~ data:", data);

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => {
      update(values);
      window.location.reload();
    };

    const update = async (values, onSubmitProps) => {
      
      // const formData = new FormData();
      console.log("values in register")
      console.log(values)
      console.log("hello register!")
      // for (let value in values) {
      //   formData.append(value, values[value]);
      // }

      const res = await axios
        .post("http://localhost:5001/users/updateUser", {
          _id: selectedRows[0],
          firstName: values.fName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          agency: values.agency,
          location: values.location,
          occupation: values.occupation,
          phoneNumber: values.phoneNumber
        })
        .catch((err) => console.log(err));
      // const data = await res.data;
      
    //   const savedUserResponse = await fetch("http://localhost:5001/auth/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // });

      
      // const savedUser = await savedUserResponse.json();
      // console.log("🚀 ~ file: Form.jsx:58 ~ register ~ savedUser:", savedUser);
      

      // onSubmitProps.resetForm();
      
    };

    const initialValues = {
      fName: data?.fName || "", // Use optional chaining to handle undefined data
      lastName: data?.lName || "",
      email: data?.email || "",
      phoneNumber: data?.phoneNumber || "",
      occupation: data?.occupation || "",
      location: data?.location || "",
      agency: data?.agency || "",
      role: data?.role || "",
    };
    console.log("🚀 ~ file: EditUserForm.jsx:98 ~ EditUserForm ~ initialValues:", initialValues)
    console.log("🚀 ~ file: EditUserForm.jsx:98 ~ EditUserForm ~ data:", data)

    const agenciesdb = useGetAllAgenciesQuery();
    const agencies = agenciesdb.data;
    console.log("🚀 ~ file: FormAddUser.jsx:33 ~ FormAddUser ~ agencies:", agencies);
    const [selectedAgency, setSelectedAgency] = useState("");

    const handleAgencyChange = (event) => {
      setSelectedAgency(event.target.value);
    };

    if (!data) {
      return <Typography>Loading...</Typography>;
    }

    return (
      <>
      { isUpdate ? (
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
                value={values.fName} // Bind to values.fName instead of data.fName
                name="fName"
                error={!!touched.fName && !!errors.fName}
                helperText={touched.fName && errors.fName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName} // Bind to values.lastName instead of data.lName
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
                value={values.email} // Bind to values.email instead of data.email
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
                value={values.phoneNumber} // Bind to values.phoneNumber instead of data.phoneNumber
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation} // Bind to values.occupation instead of data.occupation
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
                value={values.location} // Bind to values.location instead of data.location
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role} // Bind to values.occupation instead of data.occupation
                name="role"
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: "span 4" }}
              />
              {agencies && (
                <Select
                  fullWidth
                  value={values.agency} // Bind to values.agency instead of data.agency
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="agency"
                  error={touched.agency && !!errors.agency}
                  sx={{ gridColumn: "span 4" }}
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
                Edit User
              </Button>
            </Box>

            
          </form>

        )}
      </Formik>) : (
        
        <SelectedRowsTable selectedRows={selectedRows} />
      )
      
      }


    </>
    )
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    fName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone Number is required"),
    occupation: yup.string().required("Occupation is required"),
    location: yup.string().required("Location is required"),
    agency: yup.string().required("Agency is required"),
  });




  export default EditUserForm;
