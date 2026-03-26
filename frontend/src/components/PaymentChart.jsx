import { PieChart, Pie, Tooltip } from "recharts";

function PaymentChart({ data }) {

  const grouped = Object.values(
    data.reduce((acc, item) => {
      acc[item.payment_method] = acc[item.payment_method] || { name: item.payment_method, value: 0 };
      acc[item.payment_method].value += item.units_sold;
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

export default PaymentChart;