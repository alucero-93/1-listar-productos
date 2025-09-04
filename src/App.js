import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './views/AdminDashboard';
import ProductoList from './components/ProductoList';
import Login from './views/Login';
import './App.css';

// Componente auxiliar para usar hooks dentro del Router
function AppContent({ isAuthenticated, isAdmin, setIsAuthenticated }) {
    const location = useLocation();
    const hideNavbar = location.pathname === '/Login';

    return (
        <>
            {!hideNavbar && (
                <Navbar
                    isAuthenticated={isAuthenticated}
                    isAdmin={isAdmin}
                    setIsAuthenticated={setIsAuthenticated}
                />
            )}
            <Routes>               
                <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/Login" />} />
                <Route path="/productos" element={isAuthenticated ? <ProductoList /> : <Navigate to="/Login" />} />
                <Route path="/" element={isAuthenticated ? <Navigate to="/productos" /> : <Navigate to="/Login" />} />
            </Routes>
        </>
    );
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const isAdmin = true;

    return (
        <Router>
            <AppContent
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
                setIsAuthenticated={setIsAuthenticated}
            />
        </Router>
    );
}

export default App;
