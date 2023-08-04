import React, { useState } from "react";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetChequiersQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import StatBox from "components/StatBox";
import FlexBetween from "components/FlexBetween";
import EtatChequier from "components/EtatChequier";
import MonthlyChequierCounts from "components/MonthlyChequierCounts";
import { tokens } from "../../theme.js";


const Chequier = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetChequiersQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("🚀 ~ file: index.jsx:28 ~ Chequier ~ data:", data)

  


  const columns = [
    {
      field: "refDemande",
      headerName: "Reference demande",
      flex: 1,
    },
    {
      field: "clidig",
      headerName: "Client ID",
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
      field: "dpe",
      headerName: "date d'état",
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
      field: "etatDemande",
      headerName: "etat",
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        if (params.value === "validé") {
          return (
            <Box display="flex" alignItems="center" gap={4}>
              <CheckCircleOutlineIcon />
              <p>validé</p>
              
            </Box>
          );
        }
        return (
          <Box display="flex" alignItems="center" gap={4}>
            <AutorenewIcon />
            <p>en cours</p>
            
          </Box>
        );
      },
      
    },
    
    
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CHEQUIERS dashboard" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(9, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        m="0.5rem"
      >
        <Box
        gridColumn="span 3"
        >
          <StatBox
                title="Total des CHEQUIERS"
                value={data && data.total}
                increase="+14%"
                description="Since last month"
                
              />
        </Box>
      
          <Box
          gridColumn="span 3"
          >
            <StatBox
              title="Total en cours
              "
              
              value={data && data.valideCount}
              increase="+14%"
              description="Since last month"
              
            />
          </Box>
            
          <Box
          gridColumn="span 3"
          >
              <StatBox
                title="Total validé"
                value={data && data.enCoursCount}
                increase="+14%"
                description="Since last month"
                
              />
            </Box>
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
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography
          variant="h8"
          fontWeight="600"
          sx={{ color: theme.palette.secondary[200] }}
          >
            Répartition de etat de chequier
          </Typography>
            
            <EtatChequier />
        </Box>
            
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography
            fontWeight="600"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Graphique des Transferts Cumulatifs
          </Typography>

            <MonthlyChequierCounts />
            

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
          rows={(data && data.chequier) || []}
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

export default Chequier;