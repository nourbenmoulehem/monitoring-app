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



const Admin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection);
    
  };
  console.log("selected rows : ", selectedRows)
  const isAdmin = true;
  const columns = [
    { field: "_id", headerName: "ID", flex: 1, renderCell: ({ row: { role } }) => {
      return (
          <Box>
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              hi
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
      field: "phoneNumber",
      headerName: "phoneNumber",
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
  ];
  
  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)
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
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            >
              ADD new user
            </Button>
          </Box>
        </Box>
      </Box>
      <Popup
        title="Add User Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <FormAddUser recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
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
              <DataGrid checkboxSelection rows={formattedData} columns={columns} onSelectionModelChange={handleSelectionModelChange}
            selectionModel={selectedRows} 
            components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch, isAdmin: isAdmin, selectedRows },

           
          }}/>
            </Box>
          ) : (
            <Typography>Loading...</Typography>
          )}
    </>
  );
  
};



export default Admin;