import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import StockChart from "./components/StockChart";
import Summary from "./components/Summary";
import Compare from "./components/Compare";
import { getCompanies, getStockData, getPrediction } from "./api";
import "./App.css";

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [days, setDays] = useState(30);
  const [showCompare, setShowCompare] = useState(false);

  // Fetch companies on mount
  useEffect(() => {
    getCompanies().then(res => setCompanies(res.data.companies));
  }, []);

  // Handle company selection
  const handleSelect = (symbol) => {
    setShowCompare(false); // Hide compare, go back to chart view
    setSelected(symbol);
    fetchData(symbol, days);
  };

  // Fetch chart data and prediction whenever selection or days change
  useEffect(() => {
    if (!selected) return;

    getStockData(selected, days).then(res => setChartData(res.data));
    getPrediction(selected).then(res => setPrediction(res.data)); // prediction object: {future_dates, predicted_close}
  }, [selected, days]);

  return (
    <div className="container">
      <Sidebar companies={companies} onSelect={handleSelect} />
      <div className="main">
        <h1>Stock Dashboard</h1>

        {/* Button to toggle compare mode */}
        <button
          onClick={() => setShowCompare(!showCompare)}
          style={{ marginBottom: "20px" }}
        >
          {showCompare ? "Back to Chart" : "Compare Stocks"}
        </button>

        {!showCompare ? (
          <>
        <div className="filter-buttons">
          <button onClick={() => setDays(7)}>Last 7 Days</button>
          <button onClick={() => setDays(30)}>Last 30 Days</button>
          <button onClick={() => setDays(90)}>Last 90 Days</button>
        </div>

        <StockChart data={chartData} prediction={prediction} />
        <Summary symbol={selected} />
          </>
        ) : (
          <Compare />
        )}
      </div>
    </div>
  );
};

export default App;
