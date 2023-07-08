import React, { useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
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

const Credit = () => {
  const theme = useTheme();
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
      field: "ref_demande",
      headerName: "Reference demande",
      flex: 1,
    },
    {
      field: "clidig",
      headerName: "Client ID",
      flex: 1,
    },
    {
      field: "duree",
      headerName: "duree",
      flex: 1,
    },
    {
      field: "montant_demande",
      headerName: "montant",
      flex: 1,
    },
    {
      field: "revenu",
      headerName: "revenue",
      flex: 1,
    },
    {
      field: "etat_demande",
      headerName: "state",
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        if (params.value === "Validated") {
          return (
            <Box display="flex" alignItems="center" gap={4}>
              <p>Validated</p>
              <CheckCircleOutlineIcon />
            </Box>
          );
        }
        if (params.value === "Pending") {
          return (
            <Box display="flex" alignItems="center" gap={4}>
              <p>Pending</p>
              <PauseCircleFilledTwoToneIcon />
            </Box>
          );
        }
        if (params.value === "Cancelled") {
          return (
            <Box display="flex" alignItems="center" gap={4}>
              <p>Cancelled</p>
              <DoDisturbIcon />
            </Box>
          );
        }
        if (params.value === "Missing Information") {
          return (
            <Box display="flex" alignItems="center" gap={4}>
              <p>Missing Info</p>
              <RuleIcon />
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
      <Header title="CREDITS" subtitle="Entire list of CREDITS" />

        <FlexBetween>
        <StatBox
            title="Total CREDITS"
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

        <StatBox
          title="Total Cancelled"
          
          value={data && data.cancelledCount}
          increase="+14%"
          description="Since last month"
          
        />

        <StatBox
          title="Total missing information"
          
          value={data && data.missinInfoCount}
          increase="+14%"
          description="Since last month"
          
        />

        <StatBox
          title="Total in progress"
          
          value={data && data.inProgressCount}
          increase="+14%"
          description="Since last month"
          
        />
        </FlexBetween>
          

        


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