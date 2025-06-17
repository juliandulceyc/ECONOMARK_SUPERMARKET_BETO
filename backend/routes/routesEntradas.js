import express from 'express';
import { body, validationResult } from 'express-validator';
import { getAllEntradas, getEntrada, createEntrada, updateEntrada, deleteEntrada } from '../controller/EntradaController.js';

const routesEntradas = express.Router();

const entradaValidations = [
  body('idProveedor').isInt({ min: 1 }).withMessage('El idProveedor es obligatorio y debe ser un entero positivo'),
  body('idUsuario').isInt({ min: 1 }).withMessage('El idUsuario es obligatorio y debe ser un entero positivo'),
  body('tipo_comprobante').notEmpty().withMessage('El tipo_comprobante es obligatorio'),
  body('num_comprobante').notEmpty().withMessage('El num_comprobante es obligatorio'),
  body('fecha').notEmpty().withMessage('La fecha es obligatoria').isISO8601().withMessage('La fecha debe tener formato válido'),
  body('impuesto').isNumeric().withMessage('El impuesto es obligatorio y debe ser un número'),
  body('total').isNumeric().withMessage('El total es obligatorio y debe ser un número'),
  body('estado').notEmpty().withMessage('El estado es obligatorio'),
];

const entradaUpdateValidations = [
  body('idProveedor').optional().isInt({ min: 1 }).withMessage('El idProveedor debe ser un entero positivo'),
  body('idUsuario').optional().isInt({ min: 1 }).withMessage('El idUsuario debe ser un entero positivo'),
  body('tipo_comprobante').optional().notEmpty().withMessage('El tipo_comprobante no puede estar vacío'),
  body('num_comprobante').optional().notEmpty().withMessage('El num_comprobante no puede estar vacío'),
  body('fecha').optional().isISO8601().withMessage('La fecha debe tener formato válido'),
  body('impuesto').optional().isNumeric().withMessage('El impuesto debe ser un número'),
  body('total').optional().isNumeric().withMessage('El total debe ser un número'),
  body('estado').optional().notEmpty().withMessage('El estado no puede estar vacío'),
];

// Rutas para el CRUD de Entradas
routesEntradas.get('/', getAllEntradas);
routesEntradas.get('/:id', getEntrada);

// Validación para crear entrada
routesEntradas.post(
  '/',
  entradaValidations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createEntrada(req, res, next);
  }
);

// Validación para actualizar entrada
routesEntradas.put(
  '/:id',
  entradaUpdateValidations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateEntrada(req, res, next);
  }
);

routesEntradas.delete('/:id', deleteEntrada);

export default routesEntradas;
