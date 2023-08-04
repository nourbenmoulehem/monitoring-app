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
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from '@nivo/bar';



const Cards = () => {
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

  


  const pieChartData = [
    { id: 'Terminé', label: 'Terminé', value: 35 },
    { id: 'En Attente', label: 'En Attente', value: 20 },
    { id: 'En Cours', label: 'En Cours', value: 45 },
    // Add more data segments as needed
  ];

  const dataState = [
    { id: 'Bientôt Dû', value: 5, color: '#FFC107' },
  { id: 'En Retard', value: 2, color: '#F44336' },
  { id: 'À Venir', value: 8, color: '#2196F3' },
  ];
  
  const dataBarChart = [
    { carte: 'WeStart', complétées: 8, en_retard: 2, à_venir: 3 },
    { carte: 'WeTrust', complétées: 6, en_retard: 1, à_venir: 4 },
    // Ajoutez plus de données pour d'autres cartes
  ];
  
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CARTES" subtitle="" />


        <Box display="flex" alignItems="center" gap={4} m="0.5rem">
          <StatBox
              title="Total des CARTES"
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
              title="Total en attente"
              value={data && data.enCoursCount}
              increase="+14%"
              description="Depuis le mois dernier"
              
            />

          <StatBox
            title="Total terminé"
            
            value={data && data.cancelledCount}
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
        flexDirection="column"
      >
        <Typography
            p="0.5 0.6rem"
            fontSize="0.9rem"
            fontWeight="600"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Graphique à Barres - Cartes par Statut
          </Typography>
          <ResponsiveBar
      data={dataBarChart}
      keys={['complétées', 'en_retard', 'à_venir']}
      indexBy="carte"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: 'nivo' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'top-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >

          <Typography
            p="0.5 0.6rem"
            fontSize="0.9rem"
            fontWeight="600"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Graphique en Secteurs - Utilisation des cartes par statut
          </Typography>
          <ResponsivePie
            data={pieChartData}
        margin={{ top: 40, right: 50, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
        </Box>
        {/* <Box
           gridColumn="span 8"
           gridRow="span 4"
           backgroundColor={theme.palette.background.alt}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography
                variant="h5"
                fontWeight="600"
                sx={{ color: theme.palette.secondary[200] }}
              >
                Diagramme en secteurs des types de crédits
              </Typography>
          <ResponsivePie
            data={dataState}
        margin={{ top: 40, right: 50, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
          
        </Box> */}
      </Box>
        
        
    </Box>
  );
};

export default Cards;