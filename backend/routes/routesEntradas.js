import express from 'express';
import { getAllEntradas, getEntrada, createEntrada, updateEntrada, deleteEntrada } from '../controller/EntradaController.js';

const routesEntradas = express.Router();

// Rutas para el CRUD de Entradas
routesEntradas.get('/', getAllEntradas); // Obtener todas las entradas
routesEntradas.get('/:id', getEntrada); // Obtener una entrada por ID
routesEntradas.post('/', createEntrada); // Crear una nueva entrada
routesEntradas.put('/:id', updateEntrada); // Actualizar una entrada existente
routesEntradas.delete('/:id', deleteEntrada); // Eliminar una entrada por ID

export default routesEntradas;
