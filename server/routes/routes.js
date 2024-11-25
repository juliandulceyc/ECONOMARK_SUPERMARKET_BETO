import express from 'express'
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controller/ProductController.js'

const routes = express.Router()

routes.get('/', getAllProducts)
routes.get('/:id', getProduct)
routes.post('/', createProduct)
routes.put('/:id', updateProduct)
routes.delete('/:id', deleteProduct)

export default routes