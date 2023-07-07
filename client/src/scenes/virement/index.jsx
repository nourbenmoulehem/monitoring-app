import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme.js";
// import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";

const Virement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="VIREMENTS dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "15px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
            <iframe style={{background: "#21313C", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}} width="600" height="290" src="https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64a43d50-0834-4793-8284-d7e659adb708&maxDataAge=3600&theme=dark&autoRefresh=true"></iframe>
        </Box>
            
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
            <iframe style={{background: "#21313C", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}} width="600" height="290" src="https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64a4416d-2d1e-4a99-8b41-62018e402139&maxDataAge=3600&theme=dark&autoRefresh=true"></iframe>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"

        >
          <iframe style={{background: "#21313C", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}} width="1220" height="450" src="https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64a440ed-7185-42fa-849e-10f4edfb6182&maxDataAge=3600&theme=dark&autoRefresh=true"></iframe>

        </Box>
      </Box>
    </Box>
  );
};

export default Virement;