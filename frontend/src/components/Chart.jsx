import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function Chart({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="brand" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="revenue_usd" />
    </BarChart>
  );
}

export default Chart;