from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import os
from data_loader import predict_prices

from data_loader import (
    load_stock,
    get_last_30_days,
    get_summary,
    compare_stocks
)

app = FastAPI(
    title="Stock Data API",
    description="Backend APIs for HFT Assignment",
    version="1.0.0"
)

# Allow frontend (React / HTML) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (React)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------
# Endpoint: List available companies
# ---------------------------------------------------
@app.get("/companies")
def get_companies():
    files = os.listdir("./data")
    companies = [file.replace("_cleaned.csv", "") for file in files if file.endswith(".csv")]
    return {"companies": companies}


# ---------------------------------------------------
# Endpoint: Last 30 days data
# ---------------------------------------------------

@app.get("/data/{symbol}")
def get_data(symbol: str, days: int = Query(default=30, gt=0, le=365)):
    """
    Returns stock data for the last `days` days.
    Default is 30 days if not provided.
    """
    try:
        df = load_stock(symbol)  # load full 1-year data
        cutoff_date = datetime.now() - timedelta(days=days)
        df_filtered = df[df["Date"] >= cutoff_date]
        return df_filtered.to_dict(orient="records")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Symbol not found")
    
# ---------------------------------------------------
# Endpoint: Summary data
# ---------------------------------------------------
@app.get("/summary/{symbol}")
def summary(symbol: str):
    try:
        return get_summary(symbol)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Symbol not found")


# ---------------------------------------------------
# Endpoint: Compare two stocks (bonus)
# ---------------------------------------------------
@app.get("/compare")
def compare(symbol1: str, symbol2: str, days: int = Query(default=30, gt=0)):
    """
    Compare two stocks over the last `days` days.
    """
    try:
        return compare_stocks(symbol1, symbol2, days)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="One or both symbols not found")
    
@app.get("/transactions")
def get_transactions(days: int = None):
    if days:
        cutoff = datetime.now() - timedelta(days=days)
        result = [t for t in TRANSACTIONS if t["timestamp"] >= cutoff]
        return result

    return TRANSACTIONS

@app.get("/predict/{symbol}")
def predict(symbol: str):
    try:
        return predict_prices(symbol)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Symbol not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.environ.get("PORT", 8000)), reload=True)
