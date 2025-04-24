// routes/entradaProductoRoutes.js
import express from "express";
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
routesEntradaProductos.post("/", createEntradaProducto);
routesEntradaProductos.put("/:id", updateEntradaProducto);
routesEntradaProductos.delete("/:id", deleteEntradaProducto);

export default routesEntradaProductos;
