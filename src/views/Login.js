import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://localhost:7010/api/Producto/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            if (response.ok) {
                // Si la respuesta es exitosa, parsea el JSON
                const data = await response.json();
                setIsAuthenticated(true);
                localStorage.setItem('token', data.token);
                // Aquí puedes guardar info del usuario si lo necesitas, por ejemplo:
                // localStorage.setItem('user', JSON.stringify(data));
                navigate('/productos');
            } else {
                // Si la respuesta es error, muestra el mensaje
                const errorMsg = await response.text();
                setError(errorMsg || 'Credenciales incorrectas');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Usuario" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Contraseña" 
                    required 
                />
                <button type="submit">Iniciar sesión</button>
            </form>
            {error && <div style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>{error}</div>}

        </div>
    );
}

export default Login;
