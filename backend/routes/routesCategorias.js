import express from 'express'
import { getAllCategorias, getCategoria, createCategoria, updateCategoria, deleteCategoria } from '../controller/CategoriaController.js'

const routesCategorias = express.Router()

routesCategorias.get('/', getAllCategorias)
routesCategorias.get('/:id', getCategoria)
routesCategorias.post('/', createCategoria)
routesCategorias.put('/:id', updateCategoria)
routesCategorias.delete('/:id', deleteCategoria)

export default routesCategorias