import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', values);
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        navigate('/home', { replace: true }); // Añadir replace: true
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
    <div className='d-flex justify-content-center align-items-center bg-white vh-100'>
      <div className='bg-white p-3 rounded-0 w-25 border'>
        <h2 className='mb-3'>Login</h2>
        <form onSubmit={handleSumbit}>
          {error && <div className='alert alert-danger'>{error}</div>}
          <div className='mb-3'>
            <label htmlFor='username' className='form-label'>Usuario</label>
            <input
              type='text'
              placeholder='Ingrese su usuario'
              className='form-control rounded-0 mb-3'
              name='username'
              onChange={handleChanges}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input
              type='password'
              placeholder='Ingrese su contraseña'
              className='form-control rounded-0'
              name='password'
              onChange={handleChanges}
            />
          </div>
          <button className='btn btn-success w-100 rounded-0'>Login</button>
        </form>
        <div className='mt-3'>
          <span>¿No está registrado? </span>
          <Link to='/register' className='text-blue-500'>Registro</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
