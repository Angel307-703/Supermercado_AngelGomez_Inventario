# Inventario de Productos – Supermercado (FARM Stack)

Aprendiz: Angel David Gomez Quiroga
Caso de estudio: Supermercado – Inventario de Productos
Modelo: `nombre_item`, `categoria`, `stock`, `en_oferta`

## Requisitos
- Python 3.10+
- Node.js 18+
- MongoDB corriendo en `mongodb://localhost:27017` (o MongoDB Atlas, ajustando `MONGO_URI`)

## Backend (http://localhost:8000)

```bash
cd Backend
python -m venv venv

# Windows
venv\Scripts\activate
# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

Documentación interactiva: http://localhost:8000/docs

## Frontend (http://localhost:5173)

```bash
cd cliente
npm install
npm run dev
```

## Endpoints

| Método | Ruta                  | Descripción                         |
|--------|-----------------------|-------------------------------------|
| GET    | /api/productos/       | Listar productos                    |
| GET    | /api/productos/{id}   | Obtener un producto (404 si no hay) |
| POST   | /api/productos/       | Crear (400 si el nombre ya existe)  |
| PUT    | /api/productos/{id}   | Actualizar (400 duplicado / 404)    |
| DELETE | /api/productos/{id}   | Eliminar (404 si no existe)         |

## Git

```bash
git init
git add .
git commit -m "Proyecto FARM Stack - Inventario Supermercado"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```
