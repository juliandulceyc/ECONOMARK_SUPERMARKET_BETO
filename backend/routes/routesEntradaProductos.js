// routes/entradaProductoRoutes.js
import express from "express";
import { body, validationResult } from "express-validator";
import { 
    getAllEntradaProductos, 
    getEntradaProducto, 
    createEntradaProducto, 
    updateEntradaProducto, 
    deleteEntradaProducto 
} from "../controller/EntradaProductoController.js";  

const routesEntradaProductos = express.Router();

// Rutas
routesEntradaProductos.get("/", getAllEntradaProductos);  
routesEntradaProductos.get("/:id", getEntradaProducto); 

// Validación para crear entrada de producto
routesEntradaProductos.post(
  "/",
  [
    body('idEntrada').isInt({ min: 1 }).withMessage('El idEntrada es obligatorio y debe ser un entero positivo'),
    body('idProducto').isInt({ min: 1 }).withMessage('El idProducto es obligatorio y debe ser un entero positivo'),
    body('cantidad').isInt({ min: 1 }).withMessage('La cantidad es obligatoria y debe ser un entero positivo')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createEntradaProducto(req, res, next);
  }
);

// Validación para actualizar entrada de producto
routesEntradaProductos.put(
  "/:id",
  [
    body('idEntrada').optional().isInt({ min: 1 }).withMessage('El idEntrada debe ser un entero positivo'),
    body('idProducto').optional().isInt({ min: 1 }).withMessage('El idProducto debe ser un entero positivo'),
    body('cantidad').optional().isInt({ min: 1 }).withMessage('La cantidad debe ser un entero positivo')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    updateEntradaProducto(req, res, next);
  }
);

routesEntradaProductos.delete("/:id", deleteEntradaProducto);

export default routesEntradaProductos;
