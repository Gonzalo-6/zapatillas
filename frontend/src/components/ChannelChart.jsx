import { PieChart, Pie, Tooltip, Cell } from "recharts";

function ChannelChart({ data }) {

  // 🔥 label con %
  const renderLabel = ({ percent, value }) => {
    if (!percent) return "";
    return `${(percent * 100).toFixed(0)}% (${value})`;
  };

  // 🎨 colores
  const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171"];

  // 🧠 agrupación
  const grouped = Object.values(
    data.reduce((acc, item) => {
      acc[item.sales_channel] = acc[item.sales_channel] || { name: item.sales_channel, value: 0 };
      acc[item.sales_channel].value += item.units_sold;
      return acc;
    }, {})
  );

  // 🛑 evitar errores si no hay datos
  if (!data || data.length === 0) return null;

  return (
    
    <PieChart width={300} height={300}>
      <Pie 
        data={grouped} 
        dataKey="value" 
        nameKey="name"
        label={renderLabel}   // 👈 clave
      >
        {grouped.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip formatter={(value) => `${value} ventas`} />
    </PieChart>
    
  );
}



export default ChannelChart;