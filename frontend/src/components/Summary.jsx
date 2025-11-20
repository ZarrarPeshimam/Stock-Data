import React, { useEffect, useState } from "react";
import { getSummary } from "../api";

const Summary = ({ symbol }) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (symbol) {
      getSummary(symbol).then((res) => {
        console.log("SUMMARY DATA:", res.data);
        setSummary(res.data);
      });
    }
  }, [symbol]);

  if (!summary) return null;

  // Convert summary object to array of {label, value} for mapping
  const metrics = [
    { label: "52-Week High", value: summary["52_week_high"] },
    { label: "52-Week Low", value: summary["52_week_low"] },
    { label: "Average Close", value: summary["average_close"] },
  ];

  return (
    <div className="summary">
      {metrics.map((metric) => (
        <div key={metric.label} className="summary-card">
          <h3>{metric.label}</h3>
          <p>{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Summary;
