import express from 'express';
import { getAllDetalleVentas, getDetalleVenta, createDetalleVenta, updateDetalleVenta, deleteDetalleVenta 
} from '../controller/DetalleVentaController.js';

const routesDetalleVentas = express.Router();

routesDetalleVentas.get('/', getAllDetalleVentas);
routesDetalleVentas.get('/:id', getDetalleVenta);
routesDetalleVentas.post('/', createDetalleVenta);
routesDetalleVentas.put('/:id', updateDetalleVenta);
routesDetalleVentas.delete('/:id', deleteDetalleVenta);

export default routesDetalleVentas;
