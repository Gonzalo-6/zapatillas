import { PieChart, Pie, Tooltip } from "recharts";

function GenderChart({ data }) {

  const grouped = Object.values(
    data.reduce((acc, item) => {
      acc[item.gender] = acc[item.gender] || { gender: item.gender, value: 0 };
      acc[item.gender].value += item.units_sold;
      return acc;
    }, {})
  );

  return (
    <PieChart width={300} height={300}>
      <Pie data={grouped} dataKey="value" nameKey="gender" />
      <Tooltip />
    </PieChart>
  );
}

export default GenderChart;