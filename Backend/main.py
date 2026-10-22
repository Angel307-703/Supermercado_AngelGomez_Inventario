from decouple import config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router.entidades import router as productos_router

FRONTEND_URL = config("FRONTEND_URL", default="http://localhost:5173")

app = FastAPI(
    title="API Inventario Supermercado",
    description="CRUD de productos con FastAPI + MongoDB (Motor)",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(productos_router)


@app.get("/")
async def raiz():
    return {"mensaje": "API del Inventario del Supermercado funcionando"}
