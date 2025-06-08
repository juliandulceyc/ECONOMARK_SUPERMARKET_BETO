import express from 'express';
import { body, validationResult } from 'express-validator';
import { getAllCategorias, getCategoria, createCategoria, updateCategoria, deleteCategoria } from '../controller/CategoriaController.js';

const routesCategorias = express.Router();

// Obtener todas las categorías
routesCategorias.get('/', getAllCategorias);

// Obtener una categoría por ID
routesCategorias.get('/:id', getCategoria);

// Validación y manejo de errores para crear categoría
routesCategorias.post(
  '/',
  [
    body('nombreCategoria').notEmpty().withMessage('El nombre de la categoría es obligatorio'),
    body('descripcionCategoria').optional().isString().withMessage('La descripción debe ser texto'),
    body('estado').optional().isBoolean().withMessage('El estado debe ser booleano')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createCategoria(req, res, next);
  }
);

// Validación y manejo de errores para actualizar categoría
routesCategorias.put(
  '/:id',
  [
    body('nombreCategoria').optional().notEmpty().withMessage('El nombre de la categoría no puede estar vacío'),
    body('descripcionCategoria').optional().isString().withMessage('La descripción debe ser texto'),
    body('estado').optional().isBoolean().withMessage('El estado debe ser booleano')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateCategoria(req, res, next);
  }
);

// Eliminar categoría
routesCategorias.delete('/:id', deleteCategoria);

export default routesCategorias;