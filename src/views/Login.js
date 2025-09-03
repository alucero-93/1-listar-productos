import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Datos de usuario simulados (reemplazados con los valores ingresados por el usuario)
        const validUsername = username;  // Usamos lo que el usuario ha ingresado
        const validPassword = password;  // Usamos lo que el usuario ha ingresado
        
        // Validación de login
        if (username === validUsername && password === validPassword) {
            // Redirigir a la página de administración
            navigate('/admin');
        } else {
            // Mostrar mensaje de error si las credenciales son incorrectas
            setError('Credenciales incorrectas');
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
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </div>
    );
}

export default Login;
