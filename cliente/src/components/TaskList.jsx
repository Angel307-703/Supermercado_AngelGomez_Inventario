import TaskCard from "./TaskCard";

function TaskList({ productos, onToggleOferta }) {
  if (productos.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No hay productos en el inventario. ¡Agrega el primero!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((producto) => (
        <TaskCard
          key={producto.id}
          producto={producto}
          onToggleOferta={onToggleOferta}
        />
      ))}
    </div>
  );
}

export default TaskList;
