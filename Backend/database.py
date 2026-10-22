from typing import List, Optional

from bson import ObjectId
from decouple import config
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = config("MONGO_URI", default="mongodb://localhost:27017")
DB_NAME = config("DB_NAME", default="supermercado_db")

client = AsyncIOMotorClient(MONGO_URI)
database = client[DB_NAME]
collection = database["productos"]


def serializar(doc: dict) -> dict:
    """Convierte el documento de MongoDB a un dict serializable (_id -> id)."""
    doc["id"] = str(doc.pop("_id"))
    return doc


def id_valido(id: str) -> bool:
    return ObjectId.is_valid(id)


async def obtener_por_nombre(nombre_item: str) -> Optional[dict]:
    """Busca un producto por nombre sin distinguir mayúsculas/minúsculas."""
    doc = await collection.find_one(
        {"nombre_item": {"$regex": f"^{nombre_item.strip()}$", "$options": "i"}}
    )
    return serializar(doc) if doc else None


async def obtener_todos() -> List[dict]:
    productos = []
    cursor = collection.find({})
    async for doc in cursor:
        productos.append(serializar(doc))
    return productos


async def obtener_uno(id: str) -> Optional[dict]:
    doc = await collection.find_one({"_id": ObjectId(id)})
    return serializar(doc) if doc else None


async def crear_producto(producto: dict) -> Optional[dict]:
    """Inserta un producto. Devuelve None si ya existe uno con el mismo nombre."""
    existente = await obtener_por_nombre(producto["nombre_item"])
    if existente:
        return None
    resultado = await collection.insert_one(producto)
    nuevo = await collection.find_one({"_id": resultado.inserted_id})
    return serializar(nuevo)


async def actualizar_producto(id: str, datos: dict) -> Optional[dict]:
    if datos:
        await collection.update_one({"_id": ObjectId(id)}, {"$set": datos})
    doc = await collection.find_one({"_id": ObjectId(id)})
    return serializar(doc) if doc else None


async def eliminar_producto(id: str) -> bool:
    resultado = await collection.delete_one({"_id": ObjectId(id)})
    return resultado.deleted_count == 1
