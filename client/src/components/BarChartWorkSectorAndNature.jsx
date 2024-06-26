import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, Typography, useTheme } from '@mui/material';
import { useGetClientsStatYearlyQuery } from '../state/api';
import { tokens } from "../theme";
const BarChartWorkSectorAndNature = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { year } = props;
  console.log("BARCHART WORK SECTOR AND NATURE ACTIVITY HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII!!!!!!!!!!!!!")
  console.log("🚀 ~ file: BarChartWorkSectorAndNature.jsx:10 ~ BarChartWorkSectorAndNature ~ year:", year)
  
  const { data } = useGetClientsStatYearlyQuery(String(year));

  

  // Check if data is defined and has the necessary properties
  let formattedData = [];

  if (data && data.workSectorStats) {
    formattedData = data.workSectorStats.map((item) => {
      const publicStat = item.activityNatureStats.find((stat) => stat.activityNature === 'Publique');
      const privateStat = item.activityNatureStats.find((stat) => stat.activityNature === 'Privé');

      return {
        workSector: item.workSector,
        Publique: publicStat ? publicStat.count : 0,
        publicColor: 'hsl(99, 70%, 50%)', // Set the desired color for the 'public' bar
        Privé: privateStat ? privateStat.count : 0,
        privateColor: 'hsl(255, 70%, 50%)', // Set the desired color for the 'private' bar
      };
    });
    console.log("HELLLOOOOOOOOOOOOOOOOO §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§");
    console.log("🚀 ~ file: BarChartWorkSectorAndNature.jsx:29 ~ formattedData=data.workSectorStats.map ~ formattedData:", formattedData)
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
            'Publique',
            'Privé'
            
        ]}
        indexBy="workSector"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
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
            legend: 'Secteur d\'activité',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Total',
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
        ariaLabel="Work sector barchart"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in work sector: "+e.indexValue}
    />

)
      }
export default BarChartWorkSectorAndNature;
