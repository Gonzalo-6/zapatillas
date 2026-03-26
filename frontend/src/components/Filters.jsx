const formatCountry = (c) => {
  if (c === "USA") return "🇺🇸 USA";
  if (c === "UK") return "🇬🇧 UK";
  if (c === "Germany") return "🇩🇪 Alemania";
  if (c === "India") return "🇮🇳 India";
  if (c === "UAE") return "🇦🇪 UAE";
  if (c === "Pakistan") return "🇵🇰 Pakistan";
  return c;
};


function Filters({ brands, countries, onFilter }) {
  return (
    <div>
      {/* MARCAS */}
      <select onChange={(e) => onFilter("brand", e.target.value)}>
        <option value="">Todas las marcas</option>
        {brands.map((b, i) => (
          <option key={i} value={b}>{b}</option>
        ))}
      </select>

      {/* PAÍSES */}
      <select onChange={(e) => onFilter("country", e.target.value)}>
        <option value="">Todos los países</option>
            {countries.map((c, i) => (
        <option key={i} value={c}>
            {formatCountry(c)}
        </option>
            ))}
       </select>
      
    </div>
  );
}

export default Filters;