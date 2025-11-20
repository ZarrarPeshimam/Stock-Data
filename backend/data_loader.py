import os
import pandas as pd
from datetime import datetime, timedelta
from sklearn.linear_model import LinearRegression
import numpy as np

DATA_DIR = "./data"   # adjust if needed


# ---------------------------------------------
# Load cleaned CSV for a given stock symbol
# ---------------------------------------------
def load_stock(symbol):
    filename = f"{symbol}_cleaned.csv"
    filepath = os.path.join(DATA_DIR, filename)

    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Data file not found for {symbol}")

    df = pd.read_csv(filepath)
    df["Date"] = pd.to_datetime(df["Date"])

    # ---- FIX: Force numeric conversion for all numeric columns ----
    numeric_cols = [
        "Open", "High", "Low", "Close", "Adj Close",
        "Daily_Return", "MA_7", "52_Week_High",
        "52_Week_Low", "Volatility_7"
    ]

    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    df = df.dropna(subset=["Close"])

    return df

# ---------------------------------------------
# Last 30 days of stock data
# ---------------------------------------------
def get_last_30_days(symbol):
    df = load_stock(symbol)
    cutoff = datetime.now() - timedelta(days=30)
    last_30 = df[df["Date"] >= cutoff].reset_index(drop=True)
    return last_30


# ---------------------------------------------
# Summary: 52-week high/low + average close
# ---------------------------------------------
def get_summary(symbol):
    df = load_stock(symbol)

    summary = {
        "symbol": symbol,
        "52_week_high": float(df["52_Week_High"].max()),
        "52_week_low": float(df["52_Week_Low"].min()),
        "average_close": float(df["Close"].mean())
    }

    return summary


# ---------------------------------------------
# Compare two stocks (bonus)
# ---------------------------------------------
def compare_stocks(sym1, sym2, days=30):
    df1 = load_stock(sym1)
    df2 = load_stock(sym2)

    cutoff = datetime.now() - timedelta(days=days)

    df1_filtered = df1[df1["Date"] >= cutoff].reset_index(drop=True)
    df2_filtered = df2[df2["Date"] >= cutoff].reset_index(drop=True)

    return {
        "stock1": df1_filtered.to_dict(orient="records"),
        "stock2": df2_filtered.to_dict(orient="records")
    }

def predict_prices(symbol, days_ahead=7, recent_days=30):
    df = load_stock(symbol).sort_values("Date").reset_index(drop=True)

    # Use last `recent_days` only for trend
    df_recent = df[-recent_days:].copy()
    df_recent["Index"] = np.arange(len(df_recent))

    X = df_recent["Index"].values.reshape(-1, 1)
    y = df_recent["Close"].values

    # Train linear regression on recent trend
    model = LinearRegression()
    model.fit(X, y)

    # Predict next N days
    future_X = np.arange(len(df_recent), len(df_recent) + days_ahead).reshape(-1, 1)
    preds = model.predict(future_X)

    # Prepare future dates
    last_date = df["Date"].iloc[-1]
    future_dates = [(last_date + timedelta(days=i+1)).strftime("%Y-%m-%d") for i in range(days_ahead)]

    return {
        "symbol": symbol,
        "future_dates": future_dates,
        "predicted_close": preds.tolist()
    }
