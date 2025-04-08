import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sign-in.css';
import Logo from './img/carrito-de-compras.png';

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('auto');
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, document.title, window.location.href);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  // Si ya existe un token, redirigir automáticamente a Home
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        // Navegamos a Home usando replace para que la ruta actual no quede en el historial
        navigate('/home', { replace: true });
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError('El usuario no existe.');
        } else if (err.response.status === 401) {
          setError('Contraseña incorrecta.');
        } else {
          setError('Ocurrió un error al intentar iniciar sesión.');
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
        <button className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center"
          id="bd-theme"
          type="button"
          aria-expanded="false"
          data-bs-toggle="dropdown"
          aria-label="Toggle theme">
          <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
            {theme === 'auto' && <use href="#circle-half"></use>}
            {theme === 'light' && <use href="#sun-fill"></use>}
            {theme === 'dark' && <use href="#moon-stars-fill"></use>}
          </svg>
          <span className="visually-hidden">Toggle theme</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end shadow">
          <li>
            <button type="button"
              className={`dropdown-item d-flex align-items-center ${theme === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeChange('light')}>
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#sun-fill"></use>
              </svg>
              Light
            </button>
          </li>
          <li>
            <button type="button"
              className={`dropdown-item d-flex align-items-center ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeChange('dark')}>
              <svg className="bi me-2 opacity-50" width="1em" height="1em">
                <use href="#moon-stars-fill"></use>
              </svg>
              Dark
            </button>
          </li>
          <li>
            <button type="button"
              className={`dropdown-item d-flex align-items-center ${theme === 'auto' ? 'active' : ''}`}
              onClick={() => handleThemeChange('auto')}>
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
            <img className="mb-4 img-fluid" src={Logo} alt="Logo" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Iniciar Sesión</h1>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Usuario"
              name="username"
              onChange={handleChanges}
            />
            <label htmlFor="username">Usuario</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChanges}
            />
            <label htmlFor="password">Contraseña</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            Ingresar
          </button>

          <div className="mt-3 text-center">
            <span>¿No tienes cuenta? </span>
            <Link to="/register" className="text-primary">Regístrate</Link>
          </div>
        </form>
      </main>

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
          <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
        </symbol>
        <symbol id="sun-fill" viewBox="0 0 16 16">
          <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
        </symbol>
      </svg>
    </div>
  );
};

export default Login;
