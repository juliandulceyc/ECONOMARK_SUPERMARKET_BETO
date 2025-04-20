import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sign-in.css';
import Logo from './img/carrito-de-compras.png';

const Register = () => {
  const [values, setValues] = useState({
    rol: '',
    username: '',
    correo: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('auto');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'auto';
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  const applyTheme = (theme) => {
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', values);
      if (response.status === 201) {
        navigate('/login', { replace: true });
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          setError('El nombre de usuario o correo ya está en uso.');
        } else {
          setError('Ocurrió un error al intentar registrarse.');
        }
      } else {
        setError('No se pudo conectar al servidor.');
      }
    }
  };

  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary" style={{ minHeight: '100vh' }}>
      {/* Theme Switcher */}
      <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
        <button
          className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
          id="bd-theme"
          type="button"
          aria-expanded="false"
          data-bs-toggle="dropdown"
          aria-label="Toggle theme"
        >
          <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
            {theme === 'auto' && <use href="#circle-half"></use>}
            {theme === 'light' && <use href="#sun-fill"></use>}
            {theme === 'dark' && <use href="#moon-stars-fill"></use>}
          </svg>
          <span className="visually-hidden">Toggle theme</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end shadow">
          <li>
            <button
              type="button"
              className={`dropdown-item d-flex align-items-center ${theme === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeChange('light')}
            >
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#sun-fill"></use>
              </svg>
              Light
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`dropdown-item d-flex align-items-center ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeChange('dark')}
            >
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#moon-stars-fill"></use>
              </svg>
              Dark
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`dropdown-item d-flex align-items-center ${theme === 'auto' ? 'active' : ''}`}
              onClick={() => handleThemeChange('auto')}
            >
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#circle-half"></use>
              </svg>
              Auto
            </button>
          </li>
        </ul>
      </div>

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
            <h1 className="h3 mb-3 fw-normal">Registro</h1>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="merged-group mb-4">
            <div className="form-floating">
              <select
                className="form-control merged-input-top"
                id="rol"
                name="rol"
                onChange={handleChanges}
                value={values.rol}
              >
                <option value="0"></option>
                <option value="admin">Admin</option>
                <option value="empleado">Empleado</option>
              </select>
              <label htmlFor="rol">Seleccione su Rol</label>
            </div>

            <div className="form-floating">
              <input
                type="text"
                className="form-control merged-input-middle"
                id="username"
                placeholder="Usuario"
                name="username"
                onChange={handleChanges}
              />
              <label htmlFor="username">Usuario</label>
            </div>

            <div className="form-floating">
              <input
                type="email"
                className="form-control merged-input-middle"
                id="correo"
                placeholder="Correo"
                name="correo"
                onChange={handleChanges}
              />
              <label htmlFor="correo">Correo</label>
            </div>

            <div className="form-floating input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control merged-input-bottom"
                id="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChanges}
              />
              <label htmlFor="password">Contraseña</label>
              <button
                type="button"
                onClick={togglePassword}
                className="toggle-password"
              >
                <img
                  src={
                    showPassword
                      ? "https://img.icons8.com/?size=100&id=89226&format=png&color=000000"
                      : "https://img.icons8.com/?size=100&id=96160&format=png&color=000000"
                  }
                  alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="toggle-icon"
                />
              </button>
            </div>
          </div>


          <button className="btn btn-primary w-100 py-2 login-submit login-btn" type="submit">
            Registrarse
          </button>

          <div className="mt-3 text-center">
            <span>¿Ya tienes cuenta? </span>
            <Link to="/login" className="text-primary">
              Inicia sesión
            </Link>
          </div>
        </form>

        {/* SVG Icons */}
        <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
          <symbol id="check2" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
          </symbol>
          <symbol id="circle-half" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
          </symbol>
          <symbol id="moon-stars-fill" viewBox="0 0 16 16">
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732l.258-.774z" />
          </symbol>
          <symbol id="sun-fill" viewBox="0 0 16 16">
            <path d="M8 12.5A4.5 4.5 0 1 0 8 3a4.5 4.5 0 0 0 0 9.5zM8 0a.5.5 0 0 1 .5.5v2.732a.5.5 0 0 1-.5.5H7.5a.5.5 0 0 1-.5-.5V.5A.5.5 0 0 1 8 0zM8 13a.5.5 0 0 1 .5.5v2.732a.5.5 0 0 1-.5.5H7.5a.5.5 0 0 1-.5-.5V13a.5.5 0 0 1 .5-.5zM2.864 2.864a.5.5 0 0 1 .707-.707l1.732 1.732a.5.5 0 0 1-.707.707L2.864 2.864zM12.607 12.607a.5.5 0 0 1 .707-.707l1.732 1.732a.5.5 0 0 1-.707.707l-1.732-1.732a.5.5 0 0 1 .707-.707zM0 8a.5.5 0 0 1 .5-.5h2.732a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5A.5.5 0 0 1 0 8zM13.5 8a.5.5 0 0 1 .5.5h2.732a.5.5 0 0 1 .5-.5v-1a.5.5 0 0 1-.5-.5H14a.5.5 0 0 1-.5.5zM2.864 13.136a.5.5 0 0 1 .707.707l1.732-1.732a.5.5 0 0 1-.707-.707L2.864 13.136zM12.607 3.393a.5.5 0 0 1 .707.707l1.732-1.732a.5.5 0 0 1-.707-.707L12.607 3.393z" />
          </symbol>
        </svg>
      </main>
    </div>
  );
};

export default Register;
