import React, { useEffect, useState } from "react";
import { getSummary } from "../api";

const Summary = ({ symbol }) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (symbol) getSummary(symbol).then(res => setSummary(res.data));
  }, [symbol]);
  useEffect(() => {
  if (symbol)
    getSummary(symbol).then((res) => {
      console.log("SUMMARY DATA:", res.data);
      setSummary(res.data);
    });
}, [symbol]);


  if (!summary) return null;

  return (
    <div className="summary">
      <p>52-Week High: {summary["52_week_high"]}</p>
      <p>52-Week Low: {summary["52_week_low"]}</p>
      <p>Average Close: {summary["average_close"]}</p>
    </div>
  );
};

export default Summary;
