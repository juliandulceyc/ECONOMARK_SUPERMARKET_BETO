import express from 'express';
import { body, validationResult } from 'express-validator';
import {
    getAllDetalleEntradas, getDetalleEntrada, createDetalleEntrada, updateDetalleEntrada, deleteDetalleEntrada
} from '../controller/DetalleEntradaController.js';

const routes = express.Router();

routes.get('/', getAllDetalleEntradas);
routes.get('/:id', getDetalleEntrada);

// Validación para crear detalle de entrada
routes.post(
  '/',
  [
    body('idEntrada').isInt({ min: 1 }).withMessage('El idEntrada es obligatorio y debe ser un entero positivo'),
    body('idProducto').isInt({ min: 1 }).withMessage('El idProducto es obligatorio y debe ser un entero positivo'),
    body('cantidad').isInt({ min: 1 }).withMessage('La cantidad es obligatoria y debe ser un entero positivo'),
    body('precio').isNumeric().withMessage('El precio es obligatorio y debe ser un número')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createDetalleEntrada(req, res, next);
  }
);

// Validación para actualizar detalle de entrada
routes.put(
  '/:id',
  [
    body('idEntrada').optional().isInt({ min: 1 }).withMessage('El idEntrada debe ser un entero positivo'),
    body('idProducto').optional().isInt({ min: 1 }).withMessage('El idProducto debe ser un entero positivo'),
    body('cantidad').optional().isInt({ min: 1 }).withMessage('La cantidad debe ser un entero positivo'),
    body('precio').optional().isNumeric().withMessage('El precio debe ser un número')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateDetalleEntrada(req, res, next);
  }
);

routes.delete('/:id', deleteDetalleEntrada);

export default routes;
