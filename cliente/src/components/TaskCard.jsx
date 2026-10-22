import { useNavigate } from "react-router-dom";

function TaskCard({ producto, onToggleOferta }) {
  const navigate = useNavigate();

  return (
    <div
      className={`rounded-xl shadow p-5 border-l-8 transition ${
        producto.en_oferta
          ? "bg-green-50 border-green-500"
          : "bg-white border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/productos/${producto.id}/editar`)}
        >
          <h3 className="text-lg font-bold text-gray-800">{producto.nombre_item}</h3>
          <p className="text-sm text-gray-500">{producto.categoria}</p>
        </div>

        <button
          type="button"
          title={producto.en_oferta ? "Quitar de oferta" : "Marcar en oferta"}
          onClick={() => onToggleOferta(producto)}
          className={`p-2 rounded-full transition ${
            producto.en_oferta
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-200 text-gray-500 hover:bg-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full ${
            producto.stock === 0
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          Stock: {producto.stock}
        </span>
        <span
          className={`text-sm font-semibold ${
            producto.en_oferta ? "text-green-600" : "text-gray-400"
          }`}
        >
          {producto.en_oferta ? "En oferta" : "Precio normal"}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;
