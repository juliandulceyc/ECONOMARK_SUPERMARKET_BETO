import express from 'express';
import { body, validationResult } from 'express-validator';
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct, updateStock } from '../controller/ProductController.js';

const routes = express.Router();

// Validación para crear producto
routes.post(
  '/',
  [
    body('nombreProducto').notEmpty().withMessage('El nombreProducto es obligatorio'),
    body('idCategoria').isInt({ min: 1 }).withMessage('El idCategoria es obligatorio y debe ser un entero positivo'),
    body('precioVenta').isNumeric().withMessage('El precioVenta debe ser un número'),
    body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un entero positivo'),
    body('estado').notEmpty().withMessage('El estado es obligatorio')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createProduct(req, res, next);
  }
);

// Validación para actualizar producto
routes.put(
  '/:id',
  [
    body('nombreProducto').optional().notEmpty().withMessage('El nombreProducto no puede estar vacío'),
    body('idCategoria').optional().isInt({ min: 1 }).withMessage('El idCategoria debe ser un entero positivo'),
    body('precioVenta').optional().isNumeric().withMessage('El precioVenta debe ser un número'),
    body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un entero positivo'),
    body('estado').optional().notEmpty().withMessage('El estado no puede estar vacío')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateProduct(req, res, next);
  }
);

routes.get('/', getAllProducts);
routes.get('/:id', getProduct);
routes.delete('/:id', deleteProduct);
// Actualizar stock (puedes agregar validación si lo necesitas)
routes.put('/actualizar_stock', updateStock);

export default routes;