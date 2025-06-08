import express from 'express';
import { body, validationResult } from 'express-validator';
import { getAllDetalleVentas, getDetalleVenta, createDetalleVenta, updateDetalleVenta, deleteDetalleVenta } from '../controller/DetalleVentaController.js';

const routesDetalleVentas = express.Router();

routesDetalleVentas.get('/', getAllDetalleVentas);
routesDetalleVentas.get('/:id', getDetalleVenta);

// Validación para crear detalle de venta
routesDetalleVentas.post(
  '/',
  [
    body('idVenta').isInt({ min: 1 }).withMessage('El idVenta es obligatorio y debe ser un entero positivo'),
    body('idProducto').isInt({ min: 1 }).withMessage('El idProducto es obligatorio y debe ser un entero positivo'),
    body('cantidad').isInt({ min: 1 }).withMessage('La cantidad es obligatoria y debe ser un entero positivo'),
    body('precio').isNumeric().withMessage('El precio es obligatorio y debe ser un número'),
    body('descuento').isNumeric().withMessage('El descuento es obligatorio y debe ser un número')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createDetalleVenta(req, res, next);
  }
);

// Validación para actualizar detalle de venta
routesDetalleVentas.put(
  '/:id',
  [
    body('idVenta').optional().isInt({ min: 1 }).withMessage('El idVenta debe ser un entero positivo'),
    body('idProducto').optional().isInt({ min: 1 }).withMessage('El idProducto debe ser un entero positivo'),
    body('cantidad').optional().isInt({ min: 1 }).withMessage('La cantidad debe ser un entero positivo'),
    body('precio').optional().isNumeric().withMessage('El precio debe ser un número'),
    body('descuento').optional().isNumeric().withMessage('El descuento debe ser un número')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateDetalleVenta(req, res, next);
  }
);

routesDetalleVentas.delete('/:id', deleteDetalleVenta);

export default routesDetalleVentas;
