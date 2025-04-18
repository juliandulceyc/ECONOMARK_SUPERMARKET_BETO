import express from 'express';
import {
    getAllDetalleEntradas, getDetalleEntrada, createDetalleEntrada,updateDetalleEntrada, deleteDetalleEntrada
} from '../controller/DetalleEntradaController.js';

const routes = express.Router();

routes.get('/', getAllDetalleEntradas);
routes.get('/:id', getDetalleEntrada);
routes.post('/', createDetalleEntrada);
routes.put('/:id', updateDetalleEntrada);
routes.delete('/:id', deleteDetalleEntrada);

export default routes;
