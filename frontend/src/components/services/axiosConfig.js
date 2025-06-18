// services/axiosConfig.js
import axios from 'axios';

// Configuración de axios centralizada
const API = axios.create({
  baseURL: 'http://supermarketbeto.duckdns.org:3000', 
  withCredentials: true,  // Habilitar credenciales para compartir cookies
});

export default API;
