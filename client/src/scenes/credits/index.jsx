import React, { useState } from "react";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCreditsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import RuleIcon from '@mui/icons-material/Rule';
import StatBox from "components/StatBox";
import FlexBetween from "components/FlexBetween";
import MontantBarChart from "../../components/montantCreditsStatBarChart"
import EtatCreditsPie from "../../components/etatCreditsPie"
import TypeCreditsPieChart from "components/TypeCreditsPieChart";
import { tokens } from "../../theme.js";


const Credit = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetCreditsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("🚀 ~ file: index.jsx:28 ~ Credit ~ data:", data)

  


  const columns = [
    {
      field: "_id",
      headerName: "Reference demande",
      flex: 1,
    },
    {
      field: "compteEmprunteur",
      headerName: "compte Emprunteur",
      flex: 1,
    },
    {
      field: "compteBeneficiaire",
      headerName: "compte Bénéficiaire",
      flex: 1,
    },
    {
      field: "dureeMois",
      headerName: "durée en mois",
      flex: 1,
    },
    {
      field: "montant",
      headerName: "montant",
      flex: 1,
    },
    {
      field: "tauxInteret",
      headerName: "Le taux d'intérêt",
      flex: 1,
    },
    {
      field: "etat",
      headerName: "Etat demande",
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
    <Box m="1.5rem 2.5rem">
      <Header title="CREDITS" subtitle="" />


        <Box display="flex" alignItems="center" gap={4} m="0.5rem">
          <StatBox
              title="Total des CREDITS"
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
          

        
        <Box
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        m="0.5rem"
      > 
        <Box
        gridColumn="span 4"
        gridRow="span 4"
        backgroundColor={theme.palette.background.alt}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography
            p="0.5 0.6rem"
            fontSize="0.9rem"
            fontWeight="600"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Répartition des montants de crédit dans différentes tranches
          </Typography>
          <MontantBarChart />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          {/* <iframe style={{background: theme.palette.background.alt, border: "none", borderRadius: "2px"}} width="600" height="290" src="https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64ba4f67-8453-4765-862e-e43e28ef9f96&maxDataAge=3600&theme=light&autoRefresh=true"></iframe> */}
          <Typography
            p="0.5 0.6rem"
            fontSize="0.9rem"
            fontWeight="600"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Répartition des crédits par type de compte ou catégorie de crédit
          </Typography>
          <EtatCreditsPie />
        </Box>
        <Box
           gridColumn="span 8"
           gridRow="span 4"
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
                sx={{ color: theme.palette.secondary[200] }}
              >
                Diagramme en secteurs des types de crédits
              </Typography>
              
            </Box>
            
          </Box>
          <Box height="90%">
            <TypeCreditsPieChart/>
          </Box>
          
        </Box>
      </Box>
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
            rows={(data && data.credit) || []}
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
  );
};

export default Credit;