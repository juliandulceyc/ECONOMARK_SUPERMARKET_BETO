import express from 'express';
import { body, validationResult } from 'express-validator';
import { getAllClientes, getCliente, createCliente, updateCliente, deleteCliente } from '../controller/ClienteController.js';

const routesClientes = express.Router();

routesClientes.get('/', getAllClientes);
routesClientes.get('/:id', getCliente);

// Validación para crear cliente
routesClientes.post(
  '/',
  [
    body('nombreCliente').notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('email').isEmail().withMessage('Email inválido'),
    body('telefono').notEmpty().withMessage('El teléfono es obligatorio')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createCliente(req, res, next);
  }
);

// Validación para actualizar cliente
routesClientes.put(
  '/:id',
  [
    body('nombreCliente').optional().notEmpty().withMessage('El nombre del cliente no puede estar vacío'),
    body('email').optional().isEmail().withMessage('Email inválido'),
    body('telefono').optional().notEmpty().withMessage('El teléfono no puede estar vacío')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateCliente(req, res, next);
  }
);

routesClientes.delete('/:id', deleteCliente);

export default routesClientes;