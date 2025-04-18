import express from 'express';
import { getAllProveedores, getProveedor, createProveedor, updateProveedor, deleteProveedor } from '../controller/ProveedorController.js';

const routesProveedores = express.Router();

routesProveedores.get('/', getAllProveedores);
routesProveedores.get('/:id', getProveedor);
routesProveedores.post('/', createProveedor);
routesProveedores.put('/:id', updateProveedor);
routesProveedores.delete('/:id', deleteProveedor);

export default routesProveedores;
