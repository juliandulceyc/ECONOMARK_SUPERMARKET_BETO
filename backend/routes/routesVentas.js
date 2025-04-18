import express from 'express';
import { getAllVentas, getVenta, createVenta, updateVenta, deleteVenta } from '../controller/VentaController.js';

const routes = express.Router();

routes.get('/', getAllVentas);
routes.get('/:id', getVenta);
routes.post('/', createVenta);
routes.put('/:id', updateVenta);
routes.delete('/:id', deleteVenta);

export default routes;
