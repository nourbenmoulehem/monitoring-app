import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import {
  Box, 
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import { tokens } from "../theme.js";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Popup from "./Popup";
import EditUserForm from "./EditUserForm.jsx"

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch, isAdmin, selectedRows }, ) => {
  console.log("🚀 ~ file: DataGridCustomToolbar.jsx:24 ~ DataGridCustomToolbar ~ selectedRows:", selectedRows)
  console.log("🚀 ~ file: DataGridCustomToolbar.jsx:13 ~ DataGridCustomToolbar ~ isAdmin:", isAdmin)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null)
  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const addOrEdit = (employee, resetForm) => {
    console.log("I'm here")
  }

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
          { isAdmin && (
          <Button
          onClick={() => {
            setOpenPopup(true);
            setRecordForEdit(null);
            setIsUpdate(true);
          }}
          >
                <UpdateIcon />
                
              Update
            </Button>
            )}
             { isAdmin && (
          <Button 
              width="60%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="space-between"
              backgroundColor={ colors.greenAccent[600]}borderRadius="4px"
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
                setIsUpdate(false);
              }}
              >
                <DeleteOutlineIcon />
              Delete
            </Button>
            )}
        </FlexBetween>
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput("");
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Popup
        title="Update User Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EditUserForm recordForEdit={recordForEdit} selectedRows={selectedRows} addOrEdit={addOrEdit} isUpdate={isUpdate} />
      </Popup>
      </FlexBetween>
      
    </GridToolbarContainer>
    
  );
};

export default DataGridCustomToolbar;
