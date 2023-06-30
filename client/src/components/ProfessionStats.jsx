import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetProfessionPieChartQuery } from "../state/api.js";


const ProfessionStats = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetProfessionPieChartQuery();
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";

  const formattedData = data.map((item) => ({
    id: item.label,
    label: item.label,
    value: item.value,
    color: "white",
  }));

  return (
    <Box
      height={400}
      width={undefined}
      minHeight={325}
      minWidth={325}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        startAngle={-115}
        activeOuterRadiusOffset={16}
        colors={{ scheme: 'category10' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '0.7'
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={45}
        arcLinkLabelsTextOffset={20}
        arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
        arcLinkLabelsOffset={-24}
        arcLinkLabelsDiagonalLength={7}
        arcLinkLabelsStraightLength={11}
        arcLinkLabelsThickness={0}
        arcLinkLabelsColor="#ff2929"
        arcLabel={e=>e.id+" ("+e.value+")"}
        arcLabelsRadiusOffset={0.65}
        arcLabelsSkipAngle={4}
        arcLabelsTextColor="#ffffff"
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
                translateX: 6,
                translateY: 21,
                itemsSpacing: 0,
                itemWidth: 59,
                itemHeight: 10,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 9,
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
  );
};
  
  

export default ProfessionStats;