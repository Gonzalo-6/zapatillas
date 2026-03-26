import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "./Chart";
import Filters from "./Filters";
import GenderChart from "./GenderChart";
import ChannelChart from "./ChannelChart";
import PaymentChart from "./PaymentChart";

function Dashboard() {
  const [data, setData] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [brands, setBrands] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/data")
      .then(res => {
        setData(res.data);

        // KPI inicial
        const total = res.data.reduce((acc, item) => acc + item.revenue_usd, 0);
        setRevenue(total);

        // gráfico inicial
        const grouped = Object.values(
          res.data.reduce((acc, item) => {
            acc[item.brand] = acc[item.brand] || { brand: item.brand, revenue_usd: 0 };
            acc[item.brand].revenue_usd += item.revenue_usd;
            return acc;
          }, {})
        );
        setChartData(grouped);

        // filtros
        const uniqueBrands = [...new Set(res.data.map(d => d.brand))];
        const uniqueCountries = [...new Set(res.data.map(d => d.country))];

        setBrands(uniqueBrands);
        setCountries(uniqueCountries);
      });
  }, []);

  useEffect(() => {
  console.log(countries);
}, [countries]);

  // 🔥 AHORA SÍ: dentro del componente
  const handleFilter = (type, value) => {
    let url = "http://127.0.0.1:8000/filter?";

    if (type === "brand") url += `brand=${value}`;
    if (type === "country") url += `country=${value}`;

    axios.get(url).then(res => {
      setData(res.data);

      // KPI
      const total = res.data.reduce((acc, item) => acc + item.revenue_usd, 0);
      setRevenue(total);

      // gráfico
      const grouped = Object.values(
        res.data.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || { category: item.category, revenue_usd: 0 };
          acc[item.category].revenue_usd += item.revenue_usd;
          return acc;
        }, {})
    );

      setChartData(grouped);
    });
  };

  return (
    <div className="container">

      <div className="kpis">
        <div className="card">💰 Ingresos Total: {formatMoney(revenue)}</div>
        <div className="card">📦 Ventas: {data.length}</div>
      </div>

      <Filters 
        brands={brands} 
        countries={countries} 
        onFilter={handleFilter} 
      />

      <h3>📊 Ingresos por Marca</h3>

      <div className="charts">
        <Chart data={chartData} />
        <GenderChart data={data} />
      </div>

      <div className="charts">
        <ChannelChart data={data} />
        <PaymentChart data={data} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 10).map((item, i) => (
            <tr key={i}>
              <td>{item.brand}</td>
              <td>{item.category}</td>
              <td>{formatMoney(item.revenue_usd)}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
const formatMoney = (value) => {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR"
  });
};

export default Dashboard;

