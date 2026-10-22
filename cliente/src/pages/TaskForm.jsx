import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProducto,
  deleteProducto,
  fetchProducto,
  updateProducto,
} from "../api/entidades";

const VACIO = { nombre_item: "", categoria: "", stock: 0, en_oferta: false };

function TaskForm() {
  const [producto, setProducto] = useState(VACIO);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const editando = Boolean(id);

  useEffect(() => {
    if (!editando) return;
    const cargar = async () => {
      try {
        const res = await fetchProducto(id);
        const { nombre_item, categoria, stock, en_oferta } = res.data;
        setProducto({ nombre_item, categoria, stock, en_oferta });
      } catch (err) {
        setError("No se encontró el producto.");
      }
    };
    cargar();
  }, [id, editando]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto({
      ...producto,
      [name]:
        type === "checkbox"
          ? checked
          : name === "stock"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editando) {
        await updateProducto(id, producto);
      } else {
        await createProducto(producto);
      }
      navigate("/");
    } catch (err) {
      const detalle = err.response?.data?.detail;
      setError(
        typeof detalle === "string"
          ? detalle
          : "Ocurrió un error al guardar el producto."
      );
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await deleteProducto(id);
      navigate("/");
    } catch (err) {
      setError("No se pudo eliminar el producto.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {editando ? "Editar producto" : "Nuevo producto"}
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nombre del ítem
          </label>
          <input
            type="text"
            name="nombre_item"
            value={producto.nombre_item}
            onChange={handleChange}
            required
            placeholder="Ej: Arroz Diana 500g"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Categoría
          </label>
          <input
            type="text"
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
            required
            placeholder="Ej: Granos, Lácteos, Aseo"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            min="0"
            value={producto.stock}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            name="en_oferta"
            checked={producto.en_oferta}
            onChange={handleChange}
            className="h-4 w-4"
          />
          Producto en oferta
        </label>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="bg-emerald-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            {editando ? "Guardar cambios" : "Crear producto"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-700 font-semibold px-5 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>

          {editando && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-700 transition ml-auto"
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
