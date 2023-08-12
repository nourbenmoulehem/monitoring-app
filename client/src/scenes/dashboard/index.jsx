import React, { useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "../../components/BreakdownChart";
import OverviewChart from "../../components/OverviewChart";
import { useGetDashboardQuery } from "../../state/api";
import StatBox from "../../components/StatBox";
import axios from "axios";
import { setLogin } from "../../state";
import { useDispatch } from "react-redux";
import { tokens } from "../../theme.js";

axios.defaults.withCredentials = true;
let firstRender = true;



const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      
    },
    {
      field: "createdAt",
      headerName: "Date d'adhésion",
      flex: 1,renderCell: (params) => {
        if (params.value) {

          const date = new Date(params.value);
          const formattedDate = date.toISOString().split("T")[0];
          return formattedDate;
        }
        return "";
      },
      
    },
    {
      field: "Gouvernment", 
      headerName: "Gouvernment",
      flex: 0.5,
    },
    {
      field: "revenue",
      headerName: "revenu",
      flex: 1,
      renderCell: (params) => (params.value ? `${Number(params.value).toFixed(2)}` : ''),
    },
  ];
  
  // getting the user that logged in
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5001/auth/user", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }; //useEffect to execute


  //refreshing the token
  // const refreshToken = async () => {
  //   const res = await axios.get("http://localhost:5001/auth/refresh", {
  //     withCredentials: true,
  //   }).catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };
  
  // console.log("🚀 ~ file: index.jsx:87 ~ useEffect ~ firstRender:", firstRender)

  // useEffect(() => {
  //   if (firstRender) {
  //     firstRender = false;
  //     sendRequest().then((data) => setUser(data.user));
  //   }
  //   let interval = setInterval(() => {
  //     refreshToken().then((data) => dispatch(setLogin({
  //       user: data.user,
  //       token: data.token,
  //     }))).then((data) => setUser(data.user));
  //   }, 1000 * 29);
  //   return () => clearInterval(interval);
   
  // }, []);
  // console.log(user)
  // console.log("🚀 ~ file: index.jsx:96 ~ Dashboard ~ user:", user)
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <div><Header title="DASHBOARD" subtitle="
Bienvenue dans le tableau de bord WeBank."/></div>
        <div>{user && <p>{user.fName}</p>}</div>
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total des Clients"
          value={data && data.yearlyTotalClients}
          increase="+14%"
          description="Depuis le mois dernier"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total nouveaux comptes"
          value={data && data.yearlyTotalNewAccounts}
          
          increase="+21%"
          description="Depuis le mois dernier"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={theme.palette.background.alt}
            p="1rem"
            borderRadius="0.55rem"
            >
              <Box
                mt="10px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
              <Typography
                variant="h7"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Évolution du nombre total de clients au cours des mois de 2021.
              </Typography>
              <Box>
                <KeyboardDoubleArrowUpIcon />
              </Box>
              
            </Box>
            <OverviewChart view="sales" isDashboard={true} />

        </Box>
        <StatBox
          title="Clients actifs"
          value={data && data.yearlyTotalActiveClients}
          increase="+5%"
          description="Depuis le mois dernier"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Clients inactifs"
          value={data && data.yearlyTotalInactiveClients}
          increase="+43%"
          description="Depuis le mois dernier"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.clients) || []}
            columns={columns}
          />
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            WeTrust/WeStart
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
             
          Répartition du nombre total de clients pour WeTrust et WeStart en 2021.
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
