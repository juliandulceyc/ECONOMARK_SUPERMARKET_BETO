// services/axiosConfig.js
import axios from 'axios';

// Configuración de axios centralizada
const API = axios.create({
  baseURL: 'https://supermarketbeto.duckdns.org/api', 
  withCredentials: true,  // Habilitar credenciales para compartir cookies
});

export default API;
