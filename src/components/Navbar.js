import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, isAdmin, setIsAuthenticated }) {
    const navigate = useNavigate();

    // Función para manejar el logout
    const handleLogout = () => {
        // Eliminar el token de autenticación del localStorage si lo tienes
        setIsAuthenticated(false); // Cambiar el estado de autenticación a 'false'
        localStorage.removeItem('authToken'); // Elimina el token de localStorage
        navigate('/Login'); // Redirige al login
    };

    return (
        <nav>
            <ul>                
                {isAuthenticated && isAdmin && (
                    <>  <li>
                            <Link to="/admin">Panel de Administrador</Link>
                        </li>                      
                        <li>
                            <Link to="/productos">Productos</Link>
                        </li>
                    </>
                )}
                {/* Si está autenticado, mostrar "Logout", si no, mostrar "Login" */}
                <li>
                    {isAuthenticated ? (
                        <button onClick={handleLogout}>Logout</button> // Botón de logout
                    ) : (
                        <Link to="/Login">Login</Link> // Enlace de loginS
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;