// services/axiosConfig.js
import axios from 'axios';

// Configuración de axios centralizada
const API = axios.create({
  baseURL: 'http://localhost:3000', // La URL base de la API
  withCredentials: true,  // Habilitar credenciales para compartir cookies
});

export default API;
