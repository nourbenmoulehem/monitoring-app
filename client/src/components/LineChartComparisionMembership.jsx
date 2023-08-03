import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useGetMemberShipStatsQuery } from 'state/api';
import { useGetClientsStatYearlyQuery } from 'state/api';

const LineChartComparisionMembership = (props) => {

  const {year} = props;
  const { data, isLoading } = useGetMemberShipStatsQuery(String(year));
  console.log("🚀 ~ file: LineChartComparisionMembership.jsx:8 ~ LineChartComparisionMembership ~ data:", data)

  console.log("🚀 ~ file: LineChartComparisionMembership.jsx:8 ~ LineChartComparisionMembership ~ data:")


  
  if (isLoading || !data) {
    
    return <div>Loading...</div>;
  }

  const { ClientStat } = data;
  console.log("🚀 ~ file: LineChartComparisionMembership.jsx:20 ~ LineChartComparisionMembership ~ ClientStat:", ClientStat)
  const membershipTypeStats = ClientStat[0]?.membershipTypeStats || [];
  console.log("🚀 ~ file: LineChartComparisionMembership.jsx:22 ~ LineChartComparisionMembership ~ membershipTypeStats:", membershipTypeStats)

  const formattedData = membershipTypeStats.map((membershipTypeStats) => {
    const { membershipType, monthlyCounts } = membershipTypeStats;
    
    const formattedMonthlyCounts = monthlyCounts.map((entry) => ({
      x: entry.month,
      y: entry.count,
    }));
    console.log("🚀 ~ file: LineChartComparisionMembership.jsx:31 ~ formattedMonthlyCounts ~ formattedMonthlyCounts:", formattedMonthlyCounts)

    let color = '';
    if (membershipType === 'WeTrust') {
      color = 'hsl(278, 70%, 50%)';
    } else if (membershipType === 'WeStart') {
      color = 'hsl(75, 70%, 50%)';
    }

    return {
      id: membershipType,
      data: formattedMonthlyCounts,
      color: color,
    };
  });
  console.log("🚀 ~ file: LineChartComparisionMembership.jsx:28 ~ formattedData ~ formattedData:", formattedData)
  
  return (
    <ResponsiveLine
        data={formattedData}
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
            legend: 'mois',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'totals',
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
  )
}

export default LineChartComparisionMembership