import express from 'express';
import { body, validationResult } from 'express-validator';
import { getAllVentas, getVenta, createVenta, updateVenta, deleteVenta, getResumenVentasPorProducto } from '../controller/VentaController.js';

const routesVentas = express.Router();

routesVentas.get('/resumen-productos', getResumenVentasPorProducto);
routesVentas.get('/', getAllVentas);
routesVentas.get('/:id', getVenta);

// Validaciones reutilizables
const ventaValidations = [
  body('idCliente').isInt({ min: 1 }).withMessage('El idCliente es obligatorio y debe ser un entero positivo'),
  body('idUsuario').isInt({ min: 1 }).withMessage('El idUsuario es obligatorio y debe ser un entero positivo'),
  body('tipo_comprobante').notEmpty().withMessage('El tipo_comprobante es obligatorio'),
  body('num_comprobante').notEmpty().withMessage('El num_comprobante es obligatorio'),
  body('fecha_hora').notEmpty().withMessage('La fecha_hora es obligatoria').isISO8601().withMessage('La fecha_hora debe tener formato válido'),
  body('impuesto').isNumeric().withMessage('El impuesto es obligatorio y debe ser un número'),
  body('total').isNumeric().withMessage('El total es obligatorio y debe ser un número'),
  body('estado').notEmpty().withMessage('El estado es obligatorio'),
  // serie_comprobante es opcional
];

const ventaUpdateValidations = [
  body('idCliente').optional().isInt({ min: 1 }).withMessage('El idCliente debe ser un entero positivo'),
  body('idUsuario').optional().isInt({ min: 1 }).withMessage('El idUsuario debe ser un entero positivo'),
  body('tipo_comprobante').optional().notEmpty().withMessage('El tipo_comprobante no puede estar vacío'),
  body('num_comprobante').optional().notEmpty().withMessage('El num_comprobante no puede estar vacío'),
  body('fecha_hora').optional().isISO8601().withMessage('La fecha_hora debe tener formato válido'),
  body('impuesto').optional().isNumeric().withMessage('El impuesto debe ser un número'),
  body('total').optional().isNumeric().withMessage('El total debe ser un número'),
  body('estado').optional().notEmpty().withMessage('El estado no puede estar vacío'),
  // serie_comprobante es opcional
];

// Validación para crear venta
routesVentas.post(
  '/',
  ventaValidations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createVenta(req, res, next);
  }
);

// Validación para actualizar venta
routesVentas.put(
  '/:id',
  ventaUpdateValidations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateVenta(req, res, next);
  }
);

routesVentas.delete('/:id', deleteVenta);

export default routesVentas;
