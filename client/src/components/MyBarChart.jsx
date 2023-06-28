import { ResponsiveBar } from '@nivo/bar';
const data = [
  { country: 'USA', population: 325700000 },
  { country: 'Canada', population: 37590000 },
  // Add more data points as needed
];
const MyBarChart = () => (
  <ResponsiveBar
    data={data}
    keys={['population']}
    indexBy="country"
    // Add more props as needed
  />
);
export default MyBarChart;