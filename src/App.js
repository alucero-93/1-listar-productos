// Solo importa useState, ya no es necesario importar React
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './views/AdminDashboard';
import ProductoList from './components/ProductoList';
import Login from './views/Login';
import './App.css';

function App() {
    // Definir el estado de autenticación
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Aquí controlamos si el usuario está autenticado
    const isAdmin = true; // Cambiar según el rol del usuario

    return (
        <Router>
            {/* Navbar pasa los valores de autenticación y el setter para manejar el logout */}
            <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} setIsAuthenticated={setIsAuthenticated} />

            {/* Configuración de las rutas */}
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/Login" />} />
                <Route path="/productos" element={isAuthenticated ? <ProductoList /> : <Navigate to="/Login" />} />
                <Route path="/" element={isAuthenticated ? <Navigate to="/productos" /> : <Navigate to="/Login" />} />
            </Routes>
        </Router>
    );
}

export default App;
