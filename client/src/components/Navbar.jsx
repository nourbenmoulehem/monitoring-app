import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode, setLogout } from "../state";
import profileImage from "../assets/profile.jpeg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
} from "@mui/material";
import { useGetAllAgenciesQuery } from "../state/api.js";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
axios.defaults.withCredentials = true;

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const agenciesdb = useGetAllAgenciesQuery();
  const agencies = agenciesdb.data;
    console.log("🚀 ~ file: FormAddUser.jsx:33 ~ FormAddUser ~ agencies:", agencies);
    // const [selectedAgency, setSelectedAgency] = useState("");

  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5001/auth/logout", null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error("Unable TO Logout. Please try again");
  };

  const handleLogout = () => {
    sendLogoutReq().then(() => {
      dispatch(setLogout());
      window.location.replace("/");
    });
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = (values) => {
    update(values);
    handleCloseDialog(); // Close the dialog after form submission
  };

  const update = async (values, onSubmitProps) => {
    const res = await axios
      .post("http://localhost:5001/users/updateUser", {
        _id: user._id,
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
    console.log("🚀 ~ file: Navbar.jsx:101 ~ update ~ res:", res)
    
  };

  const initialValues = {
    fName: user.fName || "", 
    lastName: user.lName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    occupation: user.occupation || "",
    location: user.location || "",
    agency: user.agency || "",
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

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={handleOpenDialog}>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.fName + " " + user.lName}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>

      {/* User Attribute Edit Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Your Profile</DialogTitle>
        <DialogContent>
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
                Edit Your Profile
              </Button>
            </Box>

            
          </form>

        )}
      </Formik>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleCloseDialog}>Cancel</Button>
          {/* <Button onClick={handleFormSubmit} variant="contained" color="primary">
            Save
          </Button> */}
        </DialogActions>
      </Dialog>
    </AppBar>
  );
  
  
  
};



export default Navbar;
