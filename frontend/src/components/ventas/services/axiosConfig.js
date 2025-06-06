// services/axiosConfig.js
import axios from 'axios';

// Configuración de axios centralizada
const API = axios.create({
  baseURL: 'http://172.210.65.94:3000', // Cambia localhost por la IP pública de tu VM y el puerto del backend
  withCredentials: true,  // Habilitar credenciales para compartir cookies
});

export default API;
