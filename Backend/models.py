from typing import Optional
from pydantic import BaseModel, Field


class Producto(BaseModel):
    """Esquema para crear un producto del inventario del supermercado."""
    nombre_item: str = Field(..., min_length=1, max_length=100)
    categoria: str = Field(..., min_length=1, max_length=60)
    stock: int = Field(..., ge=0)
    en_oferta: bool = False


class ProductoUpdate(BaseModel):
    """Esquema para actualización parcial o total (todos los campos opcionales)."""
    nombre_item: Optional[str] = Field(None, min_length=1, max_length=100)
    categoria: Optional[str] = Field(None, min_length=1, max_length=60)
    stock: Optional[int] = Field(None, ge=0)
    en_oferta: Optional[bool] = None
