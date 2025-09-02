import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './views/AdminDashboard';
import ProductoList from './components/ProductoList.js';
import Login from './views/Login';
import './App.css';


function App() {
    const isAuthenticated = true; // Cambiar a estado real de autenticación
    const isAdmin = true; // Cambiar según el rol del usuario

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
            <Routes>
                <Route path="/login" component={Login} />
                <Route path="/admin" component={AdminDashboard} />
                <Route path="/productos" component={ProductoList} />
                <Route path="/" exact component={ProductoList} />
                {/* aqui se pueden agregar mas rutas en caso sea necesario */}
            </Routes>
        </Router>
    );
}

export default App;
