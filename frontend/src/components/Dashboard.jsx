import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "./Chart";

function Dashboard() {
  const [data, setData] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [chartData, setChartData] = useState([]);
  

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/data")
      .then(res => setData(res.data));

    axios.get("http://127.0.0.1:8000/kpi/revenue")
      .then(res => setRevenue(res.data.total_revenue));

    axios.get("http://127.0.0.1:8000/group/brand")
      .then(res => setChartData(res.data));  
  }, []);

  return (
    <div className="container">

  <div className="kpis">
    <div className="card">💰 Revenue Total: {revenue}</div>
    <div className="card">📦 Ventas: {data.length}</div>
  </div>

  {/* GRÁFICO */}
  <h3>📊 Revenue por Marca</h3>
  <div className="charts">
    <Chart data={chartData} />
  </div>

      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 10).map((item, i) => (
            <tr key={i}>
              <td>{item.brand}</td>
              <td>{item.category}</td>
              <td>{item.revenue_usd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;