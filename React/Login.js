import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './components/ShowProducts'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); 

  // Cargar las credenciales desde el archivo JSON
  const credentials = require('./credentials.json');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Buscar las credenciales en el archivo JSON
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedPassword = password.trim();
  
    const user = credentials.find(user => 
      user.username.toLowerCase() === normalizedUsername && 
      user.password === normalizedPassword
    );

    if (user) {
      // Credenciales válidas
      setSuccessMessage('¡Inicio de sesión exitoso!');
      console.log('¡Inicio de sesión exitoso!');
      navigate('/components/ShowProducts')
    } else {
      setErrorMessage('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de usuario</label>
              <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
