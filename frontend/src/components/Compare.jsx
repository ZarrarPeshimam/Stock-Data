import React, { useState, useEffect } from "react";
import { compareStocks, getCompanies } from "../api";
import StockChart from "./StockChart";

const Compare = () => {
  const [companies, setCompanies] = useState([]);
  const [symbol1, setSymbol1] = useState("");
  const [symbol2, setSymbol2] = useState("");
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    getCompanies().then((res) => setCompanies(res.data.companies));
  }, []);

  const handleCompare = async () => {
    if (!symbol1 || !symbol2) return;

    const res = await compareStocks(symbol1, symbol2, 30); // default 30 days

    setData1(res.data.stock1);
    setData2(res.data.stock2);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Compare Two Stocks</h2>

      {/* DROPDOWNS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <select className="dropdown"  value={symbol1} onChange={(e) => setSymbol1(e.target.value)}>
          <option value="">Select Stock 1</option>
          {companies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select className="dropdown"  value={symbol2} onChange={(e) => setSymbol2(e.target.value)}>
          <option value="">Select Stock 2</option>
          {companies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button onClick={handleCompare}>Compare</button>
      </div>

      {/* TWO CHARTS SIDE BY SIDE */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}
      >
        {data1 ? <StockChart data={data1} width={420} height={300}/> : <p></p>}

        {data2 ? <StockChart data={data2} width={430} height={300}/> : <p></p>}
      </div>

    </div>
  );
};

export default Compare;
