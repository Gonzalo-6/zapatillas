import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Chart({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid stroke="#444" strokeDasharray="3 3" />
      <XAxis dataKey="brand" tickFormatter={formatBrand} />
      <XAxis dataKey="category" stroke="#ccc" />
      <YAxis stroke="#ccc" />
      <Tooltip formatter={(value) => `${value.toLocaleString()} €`} />
      <Bar dataKey="revenue_usd" fill="#38bdf8" />
    </BarChart>
    
  );
}
const formatBrand = (brand) => {
  if (brand === "New Balance") return "NB";
  return brand;
};
export default Chart;