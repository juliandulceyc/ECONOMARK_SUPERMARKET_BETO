import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../sign-in.css';
import Logo from '../img/carrito-de-compras.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3000/auth/forgot-password', { correo: email });
      if (response.status === 200) {
        setMessage('Se ha enviado un correo con instrucciones para restablecer tu contraseña.');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('No se encontró un usuario con ese correo.');
      } else {
        setError('Ocurrió un error. Intenta de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary" style={{ minHeight: '100vh' }}>
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <img
              className="mb-4 img-fluid logo-hover"
              src={Logo}
              alt="Logo"
              width="72"
              height="57"
            />
            <h1 className="h3 mb-3 fw-normal">Recuperar Contraseña</h1>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              name="email"
              onChange={handleChange}
              value={email}
              required
            />
            <label htmlFor="email">Correo electrónico</label>
          </div>

          <button className="btn btn-primary w-100 py-2 login-btn" type="submit">
            Enviar instrucciones
          </button>

          <div className="mt-3 text-center">
            <Link to="/" className="text-primary">
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
