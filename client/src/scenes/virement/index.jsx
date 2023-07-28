import React, { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme.js";
// import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { useGetVirementsQuery } from "state/api";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import RuleIcon from '@mui/icons-material/Rule';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import StatBox from "components/StatBox";
import FlexBetween from "components/FlexBetween";
import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
import EtatVirementPie from "../../components/etatVirementPie";
import MonthlyVirementLineArea from "components/MonthlyVirementLineArea.jsx";

const Virement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetVirementsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("🚀 ~ file: index.jsx:38 ~ Virement ~ data:", data)
  console.log("theme", theme.palette.mode)
  const columns = [
    {
      field: "refVirement",
      headerName: "ID virmenet",
      flex: 1,
    },
    {
      field: "clidig",
      headerName: "ID Client",
      flex: 1,
    },
    {
      field: "ncpBeneficiaire",
      headerName: "compte Bénéficiaire",
      flex: 1,
    },
    {
      field: "motifVirement",
      headerName: "motif virement",
      flex: 1,
    },
    {
      field: "dad",
      headerName: "date d'admission",
      flex: 1,
      renderCell: (params) => {
        if (params.value) {

          const date = new Date(params.value);
          const formattedDate = date.toISOString().split("T")[0];
          return formattedDate;
        }
        return "";
      },
    },
    {
      field: "montant",
      headerName: "montant",
      flex: 1,
    },
    {
      field: "dpe",
      headerName: "dpe",
      flex: 1,
      renderCell: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          const formattedDate = date.toISOString().split("T")[0];
          return formattedDate;
        }
        return "";
      },
    },
    {
      field: "etat",
      headerName: "etat virement",
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        if (params.value === "Validé") {
          return (
            <Box display="flex" alignItems="center" gap={2}>
              <CheckCircleOutlineIcon />
              <p>Validé</p>
              
            </Box>
          );
        }
        if (params.value === "En attente") {
          return (
            <Box display="flex" alignItems="center" gap={2}>
              <PauseCircleFilledTwoToneIcon />
              <p>En attente</p>
              
            </Box>
          );
        }
        if (params.value === "Annulé") {
          return (
            <Box display="flex" alignItems="center" gap={2}>
              <DoDisturbIcon />
              <p>Annulé</p>
              
            </Box>
          );
        }
        if (params.value === "Info manquantes") {
          return (
            <Box display="flex" alignItems="center" gap={2}>
              <RuleIcon />
              <p>Info manquantes</p>
              
            </Box>
          );
        }
        return (
          <Box display="flex" alignItems="center" gap={2}>
            <AutorenewIcon />
            <p>En cours</p>
            
          </Box>
        );
      },
      
    },
    
    
  ];

  
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
      <Box display="flex" alignItems="center" gap={4} m="0.5rem">
      <StatBox
              title="Total CREDITS"
              value={data && data.total}
              increase="+14%"
              description="Depuis le mois dernier"
              
            />
          
          <StatBox
            title="Total en cours"
            
            value={data && data.valideCount}
            increase="+14%"
            description="Depuis le mois dernier"
            
          />

          
            <StatBox
              title="Total validé"
              value={data && data.enCoursCount}
              increase="+14%"
              description="Depuis le mois dernier"
              
            />

          <StatBox
            title="Total annulé"
            
            value={data && data.cancelledCount}
            increase="+14%"
            description="Depuis le mois dernier"
            
          />

          <StatBox
            title="info manquantes"
            
            value={data && data.missinInfoCount}
            increase="+14%"
            description="Depuis le mois dernier"
            
          />

          

        
        </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        m="0.5rem"
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
            {/* <iframe style={{background: theme.palette.background.alt, border: "none", borderRadius: "2px"}} width="600" height="290" src={`https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64a43d50-0834-4793-8284-d7e659adb708&maxDataAge=3600&theme=${theme.palette.mode}&autoRefresh=true`}></iframe> */}
            <EtatVirementPie />
        </Box>
            
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          
            {/* <iframe style={{background: theme.palette.background.alt, border: "none", borderRadius: "2px"}} width="600" height="290" src = {`https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64a4416d-2d1e-4a99-8b41-62018e402139&maxDataAge=3600&theme=${theme.palette.mode}&autoRefresh=true`}></iframe> */}
            <MonthlyVirementLineArea />
            <Typography
            p="0.3 0.3rem"
            fontSize="0.9rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Graphique des Transferts Cumulatifs
          </Typography>

        </Box>

      </Box>
      <Box m="0.5rem">
      

          <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
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
            backgroundColor: theme.palette.primary.light,
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
          rows={(data && data.virement) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
        </Box>

    </Box>

    
  );
};

export default Virement;