import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function TimeChart({ data }) {

  // 🔥 agrupar por mes
  const grouped = Object.values(
    data.reduce((acc, item) => {

      const date = new Date(item.order_date);
      const month = date.toLocaleString("es-ES", { month: "short", year: "numeric" });

      acc[month] = acc[month] || { month, revenue: 0 };

      acc[month].revenue += item.revenue_usd;

      return acc;
    }, {})
  );

  // 🛑 protección
  if (!data || data.length === 0) return null;

  return (
    <LineChart width={600} height={300} data={grouped}>
      <CartesianGrid stroke="#444" strokeDasharray="3 3" />
      <XAxis dataKey="month" stroke="#ccc" />
      <YAxis stroke="#ccc" />
      <Tooltip formatter={(value) => `${value.toLocaleString()} €`} />

      <Line 
        type="monotone" 
        dataKey="revenue" 
        stroke="#38bdf8" 
        strokeWidth={3}
      />
    </LineChart>
  );
}

export default TimeChart;