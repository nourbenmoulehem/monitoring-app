import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, Typography, useTheme } from '@mui/material';
import { useGetMontantCreditStatsQuery } from '../state/api.js';
import { tokens } from "../theme";


const MontantBarChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const { data, isLoading } = useGetMontantCreditStatsQuery();
  console.log("🚀 ~ file: RevenueBarChart.jsx:13 ~ RevenueBarChart ~ data:", data)
  
  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  // Check if data is defined and has the necessary properties
  let formattedData = [];

  if (data) {
    formattedData = data.map((item) => {
      const count = item.count;
  
      return {
        revenue: item._id,
        count: count,
        color: 'hsl(99, 70%, 50%)', // Set the desired color for the bar
      };
    });

    formattedData.sort((a, b) => {
      const order = {
        '0-5000': 0,
        '5001-10000': 1,
        '10001-20000': 2,
        '20001-50000': 3,
        '50001-100000': 4,
        '100001+': 5,
      };
  
      return order[a.revenue] - order[b.revenue];
    });
  }

  console.log("formattedData in revnueihfduiosdhf", formattedData)

  return (
    <Box
      height={600}
      width={undefined}
      minHeight={600}
      minWidth={650}
      position="relative"
    >
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
            
            "count"
        ]}
        indexBy="revenue"
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
            legend: 'Montants',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Nombre de Crédits',
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
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in work sector: "+e.indexValue}
    />
    </Box>

)
}
export default MontantBarChart;
