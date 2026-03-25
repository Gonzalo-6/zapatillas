from fastapi import FastAPI
import pandas as pd

app = FastAPI()

# Cargar datos
df = pd.read_csv("data.csv")

@app.get("/")
def root():
    return {"message": "API funcionando"}

# 🔹 Obtener todos los datos
@app.get("/data")
def get_data():
    return df.to_dict(orient="records")

# 🔹 Filtro por marca
@app.get("/brand/{brand}")
def get_by_brand(brand: str):
    filtered = df[df["brand"] == brand]
    return filtered.to_dict(orient="records")

# 🔹 KPI: ingresos totales
@app.get("/kpi/revenue")
def total_revenue():
    return {"total_revenue": df["revenue_usd"].sum()}

# 🔹 KPI: unidades vendidas
@app.get("/kpi/units")
def total_units():
    return {"units_sold": df["units_sold"].sum()}