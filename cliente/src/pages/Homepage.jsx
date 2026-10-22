import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { fetchProductos, updateProducto } from "../api/entidades";

function Homepage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarProductos = async () => {
    try {
      const res = await fetchProductos();
      setProductos(res.data);
      setError("");
    } catch (err) {
      setError("No se pudo conectar con el servidor. ¿Está activo el backend?");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleToggleOferta = async (producto) => {
    try {
      await updateProducto(producto.id, { en_oferta: !producto.en_oferta });
      await cargarProductos();
    } catch (err) {
      setError("No se pudo cambiar el estado de oferta.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Inventario de Productos
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {cargando ? (
        <p className="text-gray-500">Cargando...</p>
      ) : (
        <TaskList productos={productos} onToggleOferta={handleToggleOferta} />
      )}
    </div>
  );
}

export default Homepage;
