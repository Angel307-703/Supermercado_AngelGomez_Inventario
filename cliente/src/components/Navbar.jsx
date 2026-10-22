  import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-emerald-700 shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3a1 1 0 00.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Supermercado · Inventario
        </Link>
        <Link
          to="/productos/nuevo"
          className="bg-white text-emerald-700 font-semibold px-4 py-2 rounded-lg hover:bg-emerald-50 transition"
        >
          + Nuevo producto
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
