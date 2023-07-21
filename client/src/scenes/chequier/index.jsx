import React, { useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetChequiersQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import StatBox from "components/StatBox";
import FlexBetween from "components/FlexBetween";

const Chequier = () => {
  const theme = useTheme();
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
      headerName: "date of application submission",
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
      headerName: "date of status",
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
      headerName: "state",
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        if (params.value === "validé") {
          return (
            <Box display="flex" alignItems="center" gap={4}>
              <p>Validated</p>
              <CheckCircleOutlineIcon />
            </Box>
          );
        }
        return (
          <Box display="flex" alignItems="center" gap={4}>
            <p>Ongoing</p>
            <AutorenewIcon />
          </Box>
        );
      },
      
    },
    
    
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CHEQUIERS" subtitle="Entire list of chequiers" />

        <FlexBetween>
        <Box display="flex" alignItems="center" gap={25} m="0.5rem">
          <StatBox
              title="Total Chequiers"
              value={data && data.total}
              increase="+14%"
              description="Since last month"
              
            />
          
          <StatBox
            title="Total Ongoing"
            
            value={data && data.valideCount}
            increase="+14%"
            description="Since last month"
            
          />

          
            <StatBox
              title="Total validated"
              value={data && data.enCoursCount}
              increase="+14%"
              description="Since last month"
              
            />
            </Box>
        </FlexBetween>
          

        
        <Box
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        m="0.5rem"
      > 
        <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
          <iframe style={{background: theme.palette.background.alt, border: "none", borderRadius: "2px"}} width="600" height="290"  src="https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64ba4f67-8453-4765-862e-e43e28ef9f96&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <iframe style={{background: theme.palette.background.alt, border: "none", borderRadius: "2px"}} width="600" height="290" src="https://charts.mongodb.com/charts-dashboard-webank-dcahr/embed/charts?id=64ba4f67-8453-4765-862e-e43e28ef9f96&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
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
  );
};

export default Chequier;