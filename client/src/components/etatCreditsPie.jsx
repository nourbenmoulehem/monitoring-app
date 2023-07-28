import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetCreditCountByEtatQuery } from "state/api";

const EtatCreditsPie = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCreditCountByEtatQuery();
  console.log("🚀 ~ file: etatCreditsPie.jsx:9 ~ EtatCreditsPie ~ data:", data)
  console.log("AASLEMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!");
  

  if (!data || isLoading) return <div>Loading...</div>;

  const formattedData = data.map((item) => ({
    id: String(item._id), // Convert to string as the id should be a string
    label: String(item._id), // Convert to string as the label should be a string
    value: item.count,
    color: item._id === true ? theme.palette.primary.main : theme.palette.secondary.main,
  }));
  console.log("🚀 ~ file: flagVisioChart.jsx:19 ~ formattedData ~ formattedData:", formattedData)

  return (
    <Box
      height={625}
      width={undefined}
      minHeight={600}
      minWidth={550}
      position="relative"
    >
    <ResponsivePie
    data={formattedData}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
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
    arcLinkLabelsSkipAngle={9}
    arcLinkLabelsTextOffset={0}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsOffset={-8}
    arcLinkLabelsDiagonalLength={0}
    arcLinkLabelsStraightLength={0}
    arcLinkLabelsThickness={0}
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
            translateX: 32,
            translateY: 61,
            itemsSpacing: 0,
            itemWidth: 109,
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
  )

};

export default EtatCreditsPie;