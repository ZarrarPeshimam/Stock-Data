import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const StockChart = ({ data, prediction, width, height }) => {
  if (!data || data.length === 0) return <p>Select a company to view chart.</p>;

  const labels = data.map(d => d.Date);
  const prices = data.map(d => d.Close);
  const ma7 = data.map(d => d.MA_7);
  const volatility = data.map(d => d.Volatility_7);

  // prediction: { future_dates: [], predicted_close: [] }
  const predDates = prediction?.future_dates || [];
  const predPrices = prediction?.predicted_close || [];

  return (
    <div style={{ width: `${width}px`, margin: "20px auto", height: `${height}px` }}>
      <Line
      style={{ height: '100%' }}
        data={{
          labels: [...labels, ...predDates], // extend X-axis
          datasets: [
            { label: "Closing Price", data: [...prices, ...Array(predPrices.length).fill(null)], borderColor: "#8884d8", borderWidth: 2, tension: 0.3 },
            { label: "7-day MA", data: [...ma7, ...Array(predPrices.length).fill(null)], borderColor: "#82ca9d", borderWidth: 2, tension: 0.3 },
            { label: "Volatility", data: [...volatility, ...Array(predPrices.length).fill(null)], borderColor: "#ff7300", borderWidth: 2, tension: 0.3, yAxisID: "volatility" },
            { label: "Predicted Price", data: [...Array(prices.length).fill(null), ...predPrices], borderColor: "#FF0000", borderDash: [5,5], borderWidth: 2, tension: 0.3 }
          ],
        }}
        options={{
          responsive: true,
          interaction: { mode: "index", intersect: false },
          maintainAspectRatio: false,
          stacked: false,
          plugins: { legend: { position: "top" } },
          scales: {
            x: {
              ticks: {
                callback: function(value) {
                  const rawLabel = this.getLabelForValue(value);
                  const date = new Date(rawLabel);
                  return isNaN(date) ? rawLabel : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
                },
                maxRotation: 0,
                minRotation: 0,
                font: { size: 11 },
                autoSkip: true,
                autoSkipPadding: 8,
              },
            },
            y: { type: "linear", display: true, position: "left" },
            volatility: { type: "linear", display: true, position: "right", grid: { drawOnChartArea: false } },
          },
        }}
      />
    </div>
  );
};

export default StockChart;
