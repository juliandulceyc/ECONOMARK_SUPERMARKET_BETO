import express from 'express';
import { getAllEntradas, getEntrada, createEntrada, updateEntrada, deleteEntrada } from '../controller/EntradaController.js';

const routesEntradas = express.Router();

// Rutas para el CRUD de Entradas
routesEntradas.get('/', getAllEntradas);
routesEntradas.get('/:id', getEntrada); 
routesEntradas.post('/', createEntrada); 
routesEntradas.put('/:id', updateEntrada); // Actualizar una entrada existente
routesEntradas.delete('/:id', deleteEntrada); 

export default routesEntradas;
