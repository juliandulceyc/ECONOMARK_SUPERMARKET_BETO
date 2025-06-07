// services/axiosConfig.js
import axios from 'axios';

// Configuración de axios centralizada
const API = axios.create({
  baseURL: 'http://172.210.65.94:3000', 
  withCredentials: true,  // Habilitar credenciales para compartir cookies
});

export default API;
