import express from 'express'
import { getAllCredenciales, getCredencial, createCredencial, updateCredencial, deleteCredencial } from '../controller/CredencialController.js'

const routesCredenciales = express.Router()

routesCredenciales.get('/', getAllCredenciales)
routesCredenciales.get('/:id', getCredencial)
routesCredenciales.post('/', createCredencial)
routesCredenciales.put('/:id', updateCredencial)
routesCredenciales.delete('/:id', deleteCredencial)

export default routesCredenciales