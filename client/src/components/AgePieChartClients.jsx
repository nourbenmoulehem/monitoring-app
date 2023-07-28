import React from 'react';
import {useGetAggregateDataByAgeRangesQuery} from "state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";


const AgePieChartClients = () => {
  const { data, isLoading } = useGetAggregateDataByAgeRangesQuery();
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";
  console.log("asslema o mar7be bik fi age pie chart !!!!!!!");
  const formattedData = data.filter((ageRange) => ageRange.value > 0).map((ageRange) => ({
    id: ageRange.label,
    label: ageRange.label,
    value: ageRange.value ? ageRange.value : 0,
    color: theme.palette.secondary[200],
  }));
  console.log("🚀 ~ file: AgePieChartClients.jsx:19 ~ formattedData ~ formattedData:", formattedData)

  return (
    <ResponsivePie
        data={formattedData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'pastel1' }}
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
        arcLinkLabelsStraightLength={19}
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
                translateX: 8,
                translateY: 46,
                itemsSpacing: 0,
                itemWidth: 71,
                itemHeight: 26,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 10,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            },
            {
                anchor: 'top-left',
                direction: 'column',
                justify: false,
                translateX: -72,
                translateY: 44,
                itemWidth: 20,
                itemHeight: 17,
                itemsSpacing: 5,
                symbolSize: 18,
                itemDirection: 'left-to-right'
            }
        ]}
    />
  )
}

export default AgePieChartClients