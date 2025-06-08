import express from 'express';
import { body, validationResult } from 'express-validator';
import { getAllProveedores, getProveedor, createProveedor, updateProveedor, deleteProveedor } from '../controller/ProveedorController.js';

const routesProveedores = express.Router();

routesProveedores.get('/', getAllProveedores);
routesProveedores.get('/:id', getProveedor);
routesProveedores.post(
  '/',
  [
    body('nombreProveedor').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Email inválido'),
    body('telefono').notEmpty().withMessage('El teléfono es obligatorio')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Devuelve errores de validación
      return res.status(400).json({ errors: errors.array() });
    }
    // Llama al controlador, pasa next para manejo de errores
    createProveedor(req, res, next);
  }
);
routesProveedores.put('/:id', updateProveedor);
routesProveedores.delete('/:id', deleteProveedor);

export default routesProveedores;
