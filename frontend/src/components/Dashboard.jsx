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
  const [loading, setLoading] = useState(true);

  // 🔥 CARGA INICIAL
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/data")
      .then(res => {
        setData(res.data);

        // KPI
        const total = res.data.reduce((acc, item) => acc + item.revenue_usd, 0);
        setRevenue(total);

        // gráfico por categoría
        const grouped = Object.values(
          res.data.reduce((acc, item) => {
            acc[item.category] = acc[item.category] || { category: item.category, revenue_usd: 0 };
            acc[item.category].revenue_usd += item.revenue_usd;
            return acc;
          }, {})
        );
        setChartData(grouped);

        // filtros
        const uniqueBrands = [...new Set(res.data.map(d => d.brand))];
        const uniqueCountries = [...new Set(res.data.map(d => d.country))];

        setBrands(uniqueBrands);
        setCountries(uniqueCountries);

        setLoading(false);
      });
  }, []);

  // 🔥 FILTROS
  const handleFilter = (type, value) => {
    let url = "http://127.0.0.1:8000/filter?";

    if (value) {
      url += `${type}=${value}`;
    }

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

  // 🔥 FORMATO DINERO
  const formatMoney = (value) => {
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0
    });
  };

  // 🔥 LOADING
  if (loading) {
    return <h2>⏳ Cargando datos...</h2>;
  }

  if (data.length === 0) {
    return <h2>⚠️ No hay datos disponibles</h2>;
  }

  return (
    <div className="container">

      {/* KPIs */}
      <div className="kpis">
        <div className="card">💰 Ingresos Totales: {formatMoney(revenue)}</div>
        <div className="card">📦 Ventas: {data.length}</div>
      </div>

      {/* FILTROS */}
      <Filters 
        brands={brands} 
        countries={countries} 
        onFilter={handleFilter} 
      />

      <h3>📊 Análisis de ventas</h3>

      {/* GRÁFICOS FILA 1 */}
      <div className="charts">
        <div>
          <h4>Por Categoría</h4>
          <Chart data={chartData} />
        </div>

        <div>
          <h4>Por Género</h4>
          <GenderChart data={data} />
        </div>
      </div>

      {/* GRÁFICOS FILA 2 */}
      <div className="charts">
        <div>
          <h4>Canal de Venta</h4>
          <ChannelChart data={data} />
        </div>

        <div>
          <h4>Método de Pago</h4>
          <PaymentChart data={data} />
        </div>
      </div>

      {/* TABLA */}
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

export default Dashboard;