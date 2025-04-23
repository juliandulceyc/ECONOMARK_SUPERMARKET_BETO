import express from 'express';
import { getAllVentas, getVenta, createVenta, updateVenta, deleteVenta, getResumenVentasPorProducto } from '../controller/VentaController.js';

const routesVentas = express.Router();

routesVentas.get('/resumen-productos', getResumenVentasPorProducto);
routesVentas.get('/', getAllVentas);
routesVentas.get('/:id', getVenta);
routesVentas.post('/', createVenta);
routesVentas.put('/:id', updateVenta);
routesVentas.delete('/:id', deleteVenta);

export default routesVentas;
