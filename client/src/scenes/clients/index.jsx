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
// import BarChartWorkSectorAndNature from "../../components/BarChartWorkSectorAndNature.jsx";
import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";

const Clients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CLIENTS dashboard" />

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
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>

        </Box>

        <iframe
        style={{
          background: "#21313C",
          border: "none",
          borderRadius: "2px",
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        }}
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64941e23-7081-4e27-8ee8-cbf173a6240d&maxDataAge=3600&theme=dark&autoRefresh=true"
      />
        </Box>

      

      



  );
};

export default Clients;