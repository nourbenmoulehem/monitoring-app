import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useGetUserQuery } from "../state/api.js";
import axios from "axios";


const SelectedRowsTable = ({ selectedRows }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const datadb = useGetUserQuery(selectedRows._id);
  console.log("🚀 ~ file: selectedRows.jsx:23 ~ SelectedRowsTable ~ selectedRows:", selectedRows)
  const user = datadb.data;
  console.log("🚀 ~ file: selectedRows.jsx:20 ~ SelectedRowsTable ~ user:", user)

  useEffect(() => {
    if (selectedRows) {
      setIsLoading(true);
      setUserDetails(user);
      setIsLoading(false);
    } else {
      // No selected rows, reset userDetails
      setUserDetails([]);
      setIsLoading(true);
    }
  }, [selectedRows, user]);

  const tableFields = [
    { label: "ID", key: "_id" },
    { label: "First Name", key: "fName" },
    { label: "Last Name", key: "lName" },
    { label: "Email", key: "email" },
  ];

  const handleDelete = async () => {
    console.log("handleDelete")
    try {
      // Make the DELETE request to delete the user
      await axios.delete(`http://localhost:5001/users/deleteUser/${user._id}`);
      window.location.reload();
    } catch (error) {
      // Handle the error if the delete request fails
      console.error("Error deleting user:", error.message);
    }
  };
  

  return (
    <div>
      {isLoading ? (
        <Typography>Loading user details...</Typography>
      ) : userDetails ? (
        <Box display="flex" gap={4} justifyContent="space-between" flexDirection="column">
          <Typography>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableFields.map((field) => (
                    <TableCell key={field.label}>{field.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
            
                  <TableRow >
                    {tableFields.map((field) => (
                      <TableCell key={field.label}>{user[field.key]}</TableCell>
                    ))}
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
        </Box>
      ) : (
        <Typography>No user details found.</Typography>
      )}
    </div>
  );
};

export default SelectedRowsTable;
