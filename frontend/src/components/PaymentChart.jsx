import { PieChart, Pie, Tooltip, Cell } from "recharts";

function PaymentChart({ data }) {

  const renderLabel = ({ percent, value }) => {
    if (!percent) return "";
    return `${(percent * 100).toFixed(0)}% (${value})`;
  };

  const COLORS = ["#60a5fa", "#f472b6", "#34d399", "#fbbf24"];

  const grouped = Object.values(
    data.reduce((acc, item) => {
      acc[item.payment_method] = acc[item.payment_method] || { name: item.payment_method, value: 0 };
      acc[item.payment_method].value += item.units_sold;
      return acc;
    }, {})
  );

  return (
    <PieChart width={300} height={300}>
      <Pie 
        data={grouped} 
        dataKey="value" 
        nameKey="name"
        label={renderLabel}   // 👈 AQUÍ está la clave
      >
        {grouped.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip formatter={(value) => `${value} ventas`} />
    </PieChart>
  );
}

export default PaymentChart;