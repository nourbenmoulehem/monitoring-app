import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Box, Typography, useTheme } from '@mui/material';
import { useGetRevenueStatsQuery, useGetClientsStatYearlyQuery, useGetRevenueHistoStatsQuery } from '../state/api';
import { tokens } from "../theme";


const RevenueBarChart = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const { year } = props;
  const { data, isLoading } = useGetRevenueHistoStatsQuery(String(year));
  console.log("🚀 ~ file: RevenueBarChart.jsx:14 ~ RevenueBarChart ~ data:", data)
  console.log("🚀 ~ file: RevenueBarChart.jsx:15 ~ RevenueBarChart ~ data:", data)
  console.log("HELLO FEL REVENUE HISTOµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµ");

  
  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  // Check if data is defined and has the necessary properties
  let formattedData = [];

  if (data) {
    formattedData = data.map((item) => {
      const count = item.count;
  
      return {
        revenue: item.range,
        count: count,
        color: 'hsl(99, 70%, 50%)', // Set the desired color for the bar
      };
    });

    formattedData.sort((a, b) => {
      const order = {
        '0-700': 0,
        '700-1600': 1,
        '1600-3500': 2,
        '3500+': 3,
      };
  
      return order[a.revenue] - order[b.revenue];
    });
  }

  console.log("formattedData in revnueihfduiosdhf", formattedData)

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
            legend: 'Revenues',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Number of Clients',
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

)
}
export default RevenueBarChart;
