// routes/entradaProductoRoutes.js
import express from "express";
import { 
    getAllEntradaProductos, 
    getEntradaProducto, 
    createEntradaProducto, 
    updateEntradaProducto, 
    deleteEntradaProducto 
} from "../controller/EntradaProductoController.js";  // Cambié "controller" por "controllers" y añadí la extensión ".js"

const routesEntradaProductos = express.Router();

// Rutas
routesEntradaProductos.get("/", getAllEntradaProductos);  // Usé "getAllEntradaProductos"
routesEntradaProductos.get("/:id", getEntradaProducto);  // Usé "getEntradaProducto"
routesEntradaProductos.post("/", createEntradaProducto);
routesEntradaProductos.put("/:id", updateEntradaProducto);
routesEntradaProductos.delete("/:id", deleteEntradaProducto);

export default routesEntradaProductos;
