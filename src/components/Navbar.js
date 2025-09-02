import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, isAdmin }) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                {isAuthenticated && isAdmin && (
                    <>
                        <li>
                            <Link to="/admin">Panel de Administrador</Link>
                        </li>
                        <li>
                            <Link to="/productos">Productos</Link>
                        </li>
                    </>
                )}
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
