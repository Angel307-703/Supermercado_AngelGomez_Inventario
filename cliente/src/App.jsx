import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import TaskForm from "./pages/TaskForm";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/productos/nuevo" element={<TaskForm />} />
            <Route path="/productos/:id/editar" element={<TaskForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
