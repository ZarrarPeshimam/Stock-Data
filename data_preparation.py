import yfinance as yf
import pandas as pd
import os

# -----------------------------------------
# CONFIG
# -----------------------------------------

COMPANIES = ["TCS.NS", "INFY.NS", "RELIANCE.NS"]   # You can add/remove companies
DATA_DIR = "data"

# Ensure data directory exists
os.makedirs(DATA_DIR, exist_ok=True)


# -----------------------------------------
# FUNCTION: Download stock data
# -----------------------------------------
def fetch_stock_data(symbol):
    print(f"🔽 Downloading data for {symbol}...")
    stock = yf.download(symbol, period="1y")   # last 1 year
    stock.reset_index(inplace=True)
    return stock


# -----------------------------------------
# FUNCTION: Clean and transform
# -----------------------------------------
def clean_data(df):
    df["Date"] = pd.to_datetime(df["Date"])

    df["Daily_Return"] = (df["Close"] - df["Open"]) / df["Open"]

    df["MA_7"] = df["Close"].rolling(window=7, min_periods=1).mean()

    df["52_Week_High"] = df["High"].rolling(window=252, min_periods=1).max()
    df["52_Week_Low"] = df["Low"].rolling(window=252, min_periods=1).min()

    df["Volatility_7"] = df["Daily_Return"].rolling(window=7, min_periods=1).std()

    # Fill basic NaNs
    df["Daily_Return"].fillna(0, inplace=True)
    df["Volatility_7"].fillna(0, inplace=True)

    # Replace inf
    df.replace([float("inf"), float("-inf")], 0, inplace=True)

    # Fill remaining NaNs
    df.fillna(0, inplace=True)

    return df

# -----------------------------------------
# FUNCTION: Save to CSV
# -----------------------------------------
def save_cleaned_data(df, symbol):
    filename = f"{symbol.replace('.NS','')}_cleaned.csv"
    filepath = os.path.join(DATA_DIR, filename)
    df.to_csv(filepath, index=False)
    print(f"💾 Saved cleaned data: {filepath}")


# -----------------------------------------
# MAIN PIPELINE
# -----------------------------------------
def run_pipeline():
    for symbol in COMPANIES:
        raw = fetch_stock_data(symbol)
        cleaned = clean_data(raw)
        save_cleaned_data(cleaned, symbol)

    print("\n🚀 Data preparation completed!")


if __name__ == "__main__":
    run_pipeline()
