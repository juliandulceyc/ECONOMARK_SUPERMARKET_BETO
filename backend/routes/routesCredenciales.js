import express from 'express';
import { body, validationResult } from 'express-validator';
import { getAllCredenciales, getCredencial, createCredencial, updateCredencial, deleteCredencial } from '../controller/CredencialController.js';

const routesCredenciales = express.Router();

routesCredenciales.get('/', getAllCredenciales);
routesCredenciales.get('/:id', getCredencial);

// Validación para crear credencial
routesCredenciales.post(
  '/',
  [
    body('rol').notEmpty().withMessage('El rol es obligatorio'),
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createCredencial(req, res, next);
  }
);

// Validación para actualizar credencial
routesCredenciales.put(
  '/:id',
  [
    body('rol').optional().notEmpty().withMessage('El rol no puede estar vacío'),
    body('username').optional().notEmpty().withMessage('El nombre de usuario no puede estar vacío'),
    body('correo').optional().isEmail().withMessage('Correo inválido'),
    body('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateCredencial(req, res, next);
  }
);

routesCredenciales.delete('/:id', deleteCredencial);

export default routesCredenciales;