import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function Chart({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="brand" tickFormatter={formatBrand} />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="revenue_usd" />
    </BarChart>
  );
}
const formatBrand = (brand) => {
  if (brand === "New Balance") return "NB";
  return brand;
};
export default Chart;