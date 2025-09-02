import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Validación de login (simulada)
        if (username === 'admin' && password === 'admin') {
            history.push('/admin');
        } else {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
                <button type="submit">Iniciar sesión</button>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
}

export default Login;
