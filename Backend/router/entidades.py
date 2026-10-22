from typing import List

from fastapi import APIRouter, HTTPException

from database import (
    actualizar_producto,
    crear_producto,
    eliminar_producto,
    id_valido,
    obtener_por_nombre,
    obtener_todos,
    obtener_uno,
)
from models import Producto, ProductoUpdate

router = APIRouter(prefix="/api/productos", tags=["Productos"])


def validar_id(id: str):
    if not id_valido(id):
        raise HTTPException(status_code=400, detail="ID de producto no válido")


@router.get("/", response_model=List[dict])
async def listar_productos():
    return await obtener_todos()


@router.get("/{id}", response_model=dict)
async def obtener_producto(id: str):
    validar_id(id)
    producto = await obtener_uno(id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto


@router.post("/", response_model=dict)
async def agregar_producto(producto: Producto):
    nuevo = await crear_producto(producto.model_dump())
    if not nuevo:
        raise HTTPException(
            status_code=400, detail="Ya existe un producto con ese nombre"
        )
    return nuevo


@router.put("/{id}", response_model=dict)
async def modificar_producto(id: str, datos: ProductoUpdate):
    validar_id(id)
    if not await obtener_uno(id):
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    cambios = datos.model_dump(exclude_unset=True)
    if "nombre_item" in cambios:
        otro = await obtener_por_nombre(cambios["nombre_item"])
        if otro and otro["id"] != id:
            raise HTTPException(
                status_code=400, detail="Ya existe un producto con ese nombre"
            )

    actualizado = await actualizar_producto(id, cambios)
    return actualizado


@router.delete("/{id}", response_model=dict)
async def borrar_producto(id: str):
    validar_id(id)
    if not await eliminar_producto(id):
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"mensaje": "Producto eliminado correctamente"}
