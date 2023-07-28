import React, { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useGetMonthlyTransactionCountsQuery } from 'state/api';
import { useTheme } from "@mui/material";


const MonthlyVirementLineArea = () => {
  const isDashboard = true;
  console.log("AY AASLEMA O MAR7BEEE BIIIIIIIIIIIIIIIIIIIIIK!!!!");
  const theme = useTheme();
  const { data, isLoading } = useGetMonthlyTransactionCountsQuery();
  console.log("🚀 ~ file: LineChartComparisionMembership.jsx:8 ~ LineChartComparisionMembership ~ data:", data)
  

  const chartData = useMemo(() => {
    if (!data) return [];
    
    
    const line = {
      id: "Virements",
      color: theme.palette.secondary.main,
      data: Object.values(data).map(({ month, count }) => ({
        x: month,
        y: count,
      })),
    };

    return [line];
  }, [data, theme.palette.secondary.main]);
  
  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <>
      {/* {isDashboard && (
        <h7 style={{ textAlign: "center" }}>Total Clients Overview over the months of 2021</h7>
      )} */}
      
    <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'moins',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'total virements',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    </>
  )
}

export default MonthlyVirementLineArea