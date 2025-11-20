import axios from "axios";

const API_BASE = "http://localhost:8000";

export const getCompanies = () => axios.get(`${API_BASE}/companies`);
export const getStockData = (symbol, days = 30) =>
  axios.get(`${API_BASE}/data/${symbol}`, { params: { days } });
export const getSummary = (symbol) => axios.get(`${API_BASE}/summary/${symbol}`);
export const compareStocks = (symbol1, symbol2, days = 30) =>
  axios.get(`${API_BASE}/compare`, {
    params: { symbol1, symbol2, days }
  });

export const getPrediction = (symbol) =>
  axios.get(`${API_BASE}/predict/${symbol}`);
