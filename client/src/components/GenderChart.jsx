import React from 'react';
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetClientsStatYearlyQuery } from "../state/api";

const GenderChart = () => {
  const { data, isLoading } = useGetClientsStatYearlyQuery();
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  const femaleStat = data.genderStats.find((stat) => stat.gender === "F");
  const maleStat = data.genderStats.find((stat) => stat.gender === "M");

  const formattedData = [
    {
      id: "F",
      label: "Femme",
      value: femaleStat ? femaleStat.count : 0,
      color: theme.palette.secondary[200],
    },
    {
      id: "H",
      label: "Homme",
      value: maleStat ? maleStat.count : 0,
      color: theme.palette.secondary[200],
    },
  ];
  

  console.log(formattedData)

  return (
    <Box
      height={300} // Adjust the height as desired
      width={250} // Adjust the width as desired
      minHeight={300} // Set a minimum height to ensure visibility
      minWidth={250} // Set a minimum width to ensure visibility
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        colors={{ scheme: "category10" }}
        margin={

            { top: 40, right: 80, bottom: 100, left: 50 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 20,
            translateY: 50,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      {/* <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: "translate(-75%, -170%)"
        }}
      >
        <Typography variant="h6">
          Total: {femaleStat.count + maleStat.count}
        </Typography>
 
      </Box> */}
    </Box>
  );
}

export default GenderChart