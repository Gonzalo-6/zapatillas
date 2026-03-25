import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/data")
      .then(res => setData(res.data));

    axios.get("http://127.0.0.1:8000/kpi/revenue")
      .then(res => setRevenue(res.data.total_revenue));
  }, []);

  return (
    <div>
      <h2>💰 Revenue Total: {revenue}</h2>

      <table border="1">
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