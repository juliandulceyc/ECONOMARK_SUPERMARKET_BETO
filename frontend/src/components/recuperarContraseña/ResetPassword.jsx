import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../sign-in.css'; // Asegúrate de que este archivo CSS esté correctamente vinculado
import Logo from '../img/carrito-de-compras.png'; // Asegúrate de que la ruta de la imagen sea correcta

const ResetPassword = () => {
  const { token } = useParams();  // Obtenemos el token de la URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false); // Estado para mostrar/ocultar nueva contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmar contraseña

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }

    try {
      const response = await axios.post('http://172.210.65.94:3000/auth/reset-password', {
        token,
        newPassword
      });

      if (response.status === 200) {
        setMessage('Contraseña actualizada correctamente');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('El enlace ha expirado o es inválido');
      } else {
        setError('Ocurrió un error. Intenta de nuevo más tarde.');
      }
    }
  };

  // Funciones para manejar mostrar/ocultar contraseñas
  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            <h1 className="h3 mb-3 fw-normal">Nueva Contraseña</h1>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          <div className="form-floating">
            <input
              type={showNewPassword ? 'text' : 'password'}
              className="form-control merged-input-top"
              id="newPassword"
              placeholder="Nueva Contraseña"
              name="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
            <label htmlFor="newPassword">Nueva Contraseña</label>
            <button
              type="button"
              onClick={toggleNewPassword}
              className="toggle-password"
            >
              <img
                src={
                  showNewPassword
                    ? "https://img.icons8.com/?size=100&id=89226&format=png&color=000000"
                    : "https://img.icons8.com/?size=100&id=96160&format=png&color=000000"
                }
                alt={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="toggle-icon"
              />
            </button>
          </div>

          <div className="form-floating mb-3">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-control merged-input-bottom"
              id="confirmPassword"
              placeholder="Confirmar Contraseña"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <button
              type="button"
              onClick={toggleConfirmPassword}
              className="toggle-password"
            >
              <img
                src={
                  showConfirmPassword
                    ? "https://img.icons8.com/?size=100&id=89226&format=png&color=000000"
                    : "https://img.icons8.com/?size=100&id=96160&format=png&color=000000"
                }
                alt={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="toggle-icon"
              />
            </button>
          </div>

          <button className="btn btn-primary w-100 py-2 login-btn" type="submit">
            Restablecer Contraseña
          </button>

          <div className="mt-3 text-center">
            <Link to="/login" className="text-primary">
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ResetPassword;
