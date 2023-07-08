import React, { useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
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
import { useGetAllUsersQuery } from "../../state/api.js"
const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit] = useState(null)

  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetAllUsersQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("🚀 ~ file: index.jsx:38 ~ Virement ~ data:", data)
  console.log("theme", theme.palette.mode)
  const addOrEdit = (employee, resetForm) => {
    console.log("I'm here")
  }

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
}
const columns = [
  {
    field: "fName",
    headerName: "Reference virmenet",
    flex: 1,
  },
  {
    field: "lName",
    headerName: "lname ID",
    flex: 1,
  },
  {
    field: "email",
    headerName: "email",
    flex: 1,
  },
  
  
];


  return (
    <>
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" m="10px">
        <Header title="MANAGE USERS" />
        
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              
            }}
            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
          >
            {/* <DownloadOutlinedIcon sx={{ mr: "15px" }} /> */}
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
        <FormAddUser
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit} />
        </Popup>
        </>
  );
};



export default Form;