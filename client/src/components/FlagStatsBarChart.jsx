import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, Typography, useTheme } from '@mui/material';
import { useGetFlagStatsQuery } from '../state/api';
import { tokens } from "../theme";


const FlagStatsBarChart = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {year} = props;
  
  const { data, isLoading } = useGetFlagStatsQuery(String(year));
  

  // Check if data is defined and has the necessary properties
  let formattedData = [];

  if (data && data.ClientStat && data.ClientStat.length > 0) {
    const flagStatsData = data.ClientStat[0].flagStats;

    formattedData = flagStatsData.map((item) => ({
      flag: item.flag,
      complet: item.nature.find((nature) => nature.status === 'complet')?.count || 0,
      completColor: 'hsl(99, 70%, 50%)',
      incomplet: item.nature.find((nature) => nature.status === 'incomplet')?.count || 0,
      incompletColor: 'hsl(255, 70%, 50%)',
    }));
    console.log("HELLLOOOOOOOOOOOOOOOOO §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§");
    console.log("🚀 ~ file: FlagStatsBarChart.jsx:27 ~ formattedData=flagStatsData.map ~ formattedData:", formattedData)
  }

  

  return (

    <ResponsiveBar
        data={formattedData}
        theme={{
          // added
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
        keys={[
          "complet", "incomplet",
        ]}
        indexBy="flag"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'yellow_orange_red' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'flags',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'totalité',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
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
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
)
}

export default FlagStatsBarChart