import express from 'express'
import { getAllClientes, getCliente, createCliente, updateCliente, deleteCliente } from '../controller/ClienteController.js'

const routesClientes = express.Router()

routesClientes.get('/', getAllClientes)
routesClientes.get('/:id', getCliente)
routesClientes.post('/', createCliente)
routesClientes.put('/:id', updateCliente)
routesClientes.delete('/:id', deleteCliente)

export default routesClientes