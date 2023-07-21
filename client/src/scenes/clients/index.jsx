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
import BarChartWorkSectorAndNature from "../../components/BarChartWorkSectorAndNature.jsx";
import LineChartComparisionMembership from "../../components/LineChartComparisionMembership";
import RevenueBarChart from "../../components/RevenueBarChart.jsx";
import StatBoxClient from "../../components/StatBoxClient.jsx";
// import ProgressCircle from "../../components/ProgressCircle";
import BarChart from "../../components/BarChart.jsx";
import GenderChart from "../../components/GenderChart.jsx";
import ProfessionStats from "../../components/ProfessionStats.jsx"
import {useGetAgregateTotalClientsQuery} from "../../state/api.js"
import BreakdownChart from "../../components/BreakdownChart.jsx";
import FlagVisioStat from "components/flagVisioChart.jsx";

const Clients = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const count = useGetAgregateTotalClientsQuery()
  
  // console.log("🚀 ~ file: index.jsx:24 ~ Clients ~ count:")
  // const totalClients = count.data.entryCount
  // console.log("🚀 ~ file: index.jsx:27 ~ Clients ~ totalClients:", totalClients)
  // const totalClientsString = totalClients.toString();
  // console.log("🚀 ~ file: index.jsx:29 ~ Clients ~ totalClientsString:", totalClientsString)
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
            <DownloadOutlinedIcon sx={{ mr: "15px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(15, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBoxClient
            title="20"
            subtitle="Total Clients"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
            <GenderChart />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* <StatBoxClient
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          /> */}
          <ProfessionStats />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <iframe style={{background: theme.palette.background.alt,border: "none",borderRadius: "2px"}}  width="290" height="290" src={`https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=649f657b-66f3-4fe8-89ba-9a860baf6947&maxDataAge=3600&theme=${theme.palette.mode}&autoRefresh=true`} />
        </Box>
        

        {/* ROW 2 */}
        { /* work sector stats */ }
        <Box
          gridColumn="span 11"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Bar chart representaion of Activity sector for each activity nature
              </Typography>
              {/* <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography> */}
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* <LineChart isDashboard={true} /> */}
            {/* <BarChart isDashboard={true} /> */}
            <BarChartWorkSectorAndNature isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          overflow="auto"
        >

          <iframe style={{background: theme.palette.background.alt, border: "none", borderRadius: "2px"}} width="400" height="290" src={`https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64a42f9a-ce21-4627-8186-fb28de2c50fb&maxDataAge=3600&theme=${theme.palette.mode}&autoRefresh=true`}></iframe>
        </Box>

        {/* ROW 3 */}
        { /* Revenue stats */ }
        <Box
          gridColumn="span 15"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Bar chart representaion of Revenue
              </Typography>
              {/* <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography> */}
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* <LineChart isDashboard={true} /> */}
            {/* <BarChart isDashboard={true} /> */}
            <RevenueBarChart isDashboard={true} />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          overflow="auto"
        >
          {/* <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box> */}
          {/* {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))} 
        </Box> */}

          {/* ROW 4 */}
        { /* Membrship stats and comparison */ }
        <Box
          gridColumn="span 11"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Line chart camparison of membership
              </Typography>
              {/* <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography> */}
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* <LineChart isDashboard={true} /> */}
            {/* <BarChart isDashboard={true} /> */}
            <LineChartComparisionMembership  />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Membership pie chart representation
            </Typography>
          </Box>
          <BreakdownChart />
        </Box>

        {/* ROW 5 */}
        <Box
          gridColumn="span 3"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          {/* <iframe style={{background: "#21313C", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}} width="290" height="290" src="https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64a42909-2d1e-470f-889d-62018e278c28&maxDataAge=3600&theme=dark&autoRefresh=true"/> */}
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Flag Visio
          </Typography>
          <FlagVisioStat />
          
        </Box>

        <Box
          gridColumn="span 3"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Flag Signature
          </Typography>
          {/* <iframe style={{background: "#21313C", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}}width="290" height="290" src="https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64a429db-7185-4c8a-8351-10f4ede54ee9&maxDataAge=3600&theme=dark&autoRefresh=true"/> */}
          <FlagVisioStat />
        </Box>

        <Box
          gridColumn="span 3"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Flag Digigo Email
          </Typography>
          {/* <iframe style={{background: "#21313C", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}}width="290" height="290" src="https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64a42a22-0ef2-4d13-8d50-2a911a664b43&maxDataAge=3600&theme=dark&autoRefresh=true"></iframe> */}
          <FlagVisioStat />
        </Box>

        <Box
          gridColumn="span 3"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          {/* <iframe style={{background: "#21313C", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}}width="290" height="290" src="https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64a42a45-0ef2-4aa9-899d-2a911a66599d&maxDataAge=3600&theme=dark&autoRefresh=true"></iframe> */}
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            flagdigigo SMS
          </Typography>
          <FlagVisioStat />
        </Box>

        <Box
          gridColumn="span 3"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          {/* <iframe style={{background: "#21313C", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)"}}width="290" height="290" src="https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64a42a62-bfd6-4959-864d-aed10ec9195b&maxDataAge=3600&theme=dark&autoRefresh=true"></iframe> */}
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            flag certificat
          </Typography>
          <FlagVisioStat />
        </Box>

        

        
      </Box>

      
    </Box>

    
  );
};

export default Clients;