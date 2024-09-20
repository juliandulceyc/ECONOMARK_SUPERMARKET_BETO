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
