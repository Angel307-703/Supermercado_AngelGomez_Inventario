import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_URL}/api/productos`,
});

export const fetchProductos = () => api.get("/");

export const fetchProducto = (id) => api.get(`/${id}`);

export const createProducto = (producto) => api.post("/", producto);

export const updateProducto = (id, producto) => api.put(`/${id}`, producto);

export const deleteProducto = (id) => api.delete(`/${id}`);
