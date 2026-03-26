import { PieChart, Pie, Tooltip } from "recharts";

function ChannelChart({ data }) {

  const grouped = Object.values(
    data.reduce((acc, item) => {
      acc[item.sales_channel] = acc[item.sales_channel] || { name: item.sales_channel, value: 0 };
      acc[item.sales_channel].value += item.units_sold;
      return acc;
    }, {})
  );

  return (
    <PieChart width={300} height={300}>
      <Pie data={grouped} dataKey="value" nameKey="name" />
      <Tooltip />
    </PieChart>
  );
}

export default ChannelChart;