# Stock Data Intelligence Dashboard

## 🚀 Project Overview

This project is a **Stock Data Intelligence Dashboard**, designed as a mini financial data platform that demonstrates data handling, backend API development, visualization, and basic machine learning for stock price prediction.

It allows users to:

* Browse a list of companies
* View historical stock data with key metrics
* Compare two stocks’ performance
* Visualize stock trends using interactive charts
* Predict short-term stock prices using a linear regression ML model

The project is built using **Python (FastAPI)** for backend, **React** for frontend, and includes a lightweight **ML prediction module**.

---

## 🧩 Features

### 1. Data Collection & Preparation

* Stock data collected via CSV files (NSE/BSE or yfinance mock data).
* Cleaned and preprocessed with **Pandas**:

  * Converted date columns to datetime
  * Handled missing/incorrect data
  * Calculated metrics:

    * Daily Return = (Close - Open)/Open
    * 7-day Moving Average
    * 52-week High/Low
    * 7-day Rolling Volatility
* Dataset stored in `data/` folder for backend access.

### 2. Backend APIs (FastAPI)

Endpoints:

| Endpoint                     | Method | Description                                                         |
| ---------------------------- | ------ | ------------------------------------------------------------------- |
| `/companies`                 | GET    | Returns list of all companies                                       |
| `/data/{symbol}`             | GET    | Returns last N days of stock data                                   |
| `/summary/{symbol}`          | GET    | Returns 52-week high, low, and average close                        |
| `/compare?symbol1=&symbol2=` | GET    | Compares performance of two stocks                                  |
| `/predict/{symbol}`          | GET    | Returns predicted next N days closing price using Linear Regression |

* CORS enabled for frontend integration.
* Swagger UI available at `http://localhost:8000/docs`.

### 3. Frontend Dashboard (React)

* Sidebar listing all available companies.
* Interactive **Chart.js** line chart:

  * Closing Price
  * 7-day Moving Average
  * Volatility
  * Predicted Price (ML)
* Filters for `Last 7 / 30 / 90 days`.
* Compare stocks functionality.

### 4. Machine Learning

* **Linear Regression** model predicts short-term stock prices based on historical trends.
* Implemented in `data_loader.py` with a function `predict_prices(symbol, days_ahead=7)`
* Predictions appear as a dashed line on the chart for visual distinction.

### 5. Deployment

* Project is structured for **local deployment** with optional cloud deployment.
* Backend runs with **Uvicorn** and FastAPI:

  ```bash
  uvicorn main:app --reload
  ```
* Frontend runs with React:

  ```bash
  npm start
  ```
* Ready for cloud deployment on platforms like **Render, Vercel, or GitHub Pages**.

---

## 📦 Project Structure

```
hft-assignment/
├── backend/
│   ├── main.py            # FastAPI backend
│   ├── data_loader.py     # Data processing + ML prediction
│   ├── requirements.txt
│   └── data/              # CSV stock data
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React app
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StockChart.jsx
│   │   │   ├── Summary.jsx
│   │   │   └── Compare.jsx
│   │   └── api.js         # Axios API calls
│   ├── public/
│   └── package.json
└── README.md
```

---

## 🛠️ Installation & Setup

### Backend

1. Create Python virtual environment:

   ```bash
   python -m venv venv
   venv\Scripts\activate      # Windows
   source venv/bin/activate   # macOS/Linux
   ```
2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
3. Run FastAPI server:

   ```bash
   uvicorn main:app --reload
   ```

### Frontend

1. Navigate to frontend folder:

   ```bash
   cd frontend
   ```
2. Install Node dependencies:

   ```bash
   npm install
   ```
3. Start React development server:

   ```bash
   npm start
   ```

---

## 🎯 Usage

1. Open React app at `http://localhost:3000`.
2. Select a company from the sidebar.
3. View stock chart, MA, volatility, and predicted prices.
4. Use filter buttons to change the time window.
5. Optionally compare two companies using the "Compare Stocks" button.

---

## 📊 Notes & Insights

* Predicted prices are **short-term trends** based on last 30 days to avoid unrealistic drops.
* The dashboard provides clear **visual insights** on stock trends, volatility, and predictions.
* Can be extended with:

  * Additional ML models (ARIMA, LSTM)
  * Top Gainers/Losers panel
  * Deployment with Docker

---

## 💡 Key Learnings

* Full-stack integration of Python APIs and React frontend.
* Data preprocessing and feature engineering for stock data.
* Basic ML for trend prediction with visualization.
* API design and CORS handling.

---

## 🔗 Links

* [Backend API Docs (Swagger)](http://localhost:8000/docs)
* [Frontend Live Preview]()`  # optional deployment link

---

## 🏁 Conclusion

This project showcases **Python + ML + React full-stack capabilities**, clear **data visualization**, and **financial analytics understanding**, making it suitable for fintech or AI-driven internships.