import React, { useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import {
  AddIcon,
  Search,
  EditOutlinedIcon,
  PersonAdd,
  CloseIcon,
} from "@mui/icons-material";
import {
  Box, 
  TextField,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme.js";
import Popup from "../../components/Popup.jsx";
import FormAddUser from "./FormAddUser";
import { useGetUsersQuery  } from "state/api";
import ActionButton from "components/ActionButton";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import EditUserForm from "components/EditUserForm";
import {  List, ListItem, ListItemText, Modal } from "@mui/material";


const Admin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // model to create event

  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection);
    
  };
  const handleDateClick = (selected) => {
    
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    
  };
  console.log("selected rows : ", selectedRows)
  const isAdmin = true;
  const columns = [
    { field: "_id", headerName: "ID", flex: 1, renderCell: ({ row: { role } }) => {
      return (
          <Box>
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              -
            </Typography>
          </Box>
        )
      }
    },
    {
      field: "fName",
      headerName: "fName",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "occupation",
      headerName: "occupation",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <Box>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              marginRight: 3,
            }}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
              setIsUpdate(true);
              setFormTitle("Edit User")
              setSelectedRow(row);
              setIsUpdate(true)
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            sx={{
              backgroundColor:  theme.palette.background.alt,
              color: theme.palette.secondary.light,
              
            }}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
              setIsUpdate(false);
              setFormTitle("Delete User")
              setSelectedRow(row);
              setIsUpdate(false)
            }}
            
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];
  console.log(selectedRow)
  console.log("🚀 ~ file: index.jsx:161 ~ Admin ~ selectedRow:", selectedRow)
  
  const [openPopup, setOpenPopup] = useState(false)
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [formTitle, setFormTitle] = useState("");
  const { data, isLoading } = useGetUsersQuery();
  console.log("🚀 ~ file: index.jsx:45 ~ Form ~ data:", data)
  
  const formattedData = data?.map(item => ({
    ...item,
    id: item._id,
  }));
  // const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // // values to be sent to the backend
  // const [page, setPage] = useState(0);
  // const [pageSize, setPageSize] = useState(20);
  // const [sort, setSort] = useState({});
  // const [search, setSearch] = useState("");

  // const [searchInput, setSearchInput] = useState("");
  console.log("hi?")
 

  const addOrEdit = (employee, resetForm) => {
    console.log("I'm here")
  }

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }
  
  
  
  // Utilisez le tableau formaté dans la grille de données
  <DataGrid checkboxSelection rows={formattedData} columns={columns} />
  
  

  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center" m="10px">
          <Header title="MANAGE USERS" />
          
          {/* Add new user popup */}
          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={() => {
                setIsModalOpen(true)
              }}
            >
              ADD new user
            </Button>
          </Box>
        </Box>
      </Box>
      <Popup
        title={formTitle}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        
      >
        {/* <FormAddUser recordForEdit={recordForEdit} addOrEdit={addOrEdit} title={formTitle} selectedRows={selectedRows}/> */}
        <EditUserForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} title={formTitle} selectedRows={selectedRow}  isUpdate={isUpdate}/>
      </Popup>

      {data ? (
            <Box
              m="40px 0 0 0"
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
              }}
            >
              <DataGrid checkboxSelection rows={formattedData} columns={columns} />
            </Box>
          ) : (
            <Typography>Loading...</Typography>
          )}

<Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="event-title-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: theme.palette.background.paper,
            borderRadius: "5px",
            boxShadow: 24,
            p: 4,
            minWidth: "400px", // Adjust the width here
          }}
        >
          Add a User
          <form>
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
                
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Occupation"
                
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                
                sx={{ gridColumn: "span 4" }}
              />
              
            </Box>
            
          </form>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={handleModalClose} sx={{
              backgroundColor:  theme.palette.background.alt,
              color: theme.palette.secondary.light,
              
            }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2, bgcolor: theme.palette.secondary.light, '&:hover': { bgcolor: theme.palette.primary.dark } }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
  
};



export default Admin;