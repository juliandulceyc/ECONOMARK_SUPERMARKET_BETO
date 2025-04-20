//importamos el modelo 
import ProductModel from "../models/ProductModel.js";

//** Métodos para el CRUD **//

//Mostrar todos los registros 
export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll();
        res.json(products);
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Mostrar un registro 
export const getProduct = async (req, res) => { 
    try {
        const product = await ProductModel.findAll({
            where: { idProducto: req.params.id }
        });
        res.json(product[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Crear un registro 
export const createProduct = async (req, res) => {
    try {
        await ProductModel.create(req.body);
        res.json({ message: "¡Registro creado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Actualizar un registro 
export const updateProduct = async (req, res) => {
    try {
        await ProductModel.update(req.body, { where: { idProducto: req.params.id } });
        res.json({ message: "¡Registro actualizado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

//Eliminar un registro 
export const deleteProduct = async (req, res) => {
    try {
        await ProductModel.destroy({ where: { idProducto: req.params.id } });
        res.json({ message: "¡Registro eliminado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar stock de un producto después de la venta
export const updateStock = async (req, res) => {
    const { idProducto, cantidadVendida } = req.body;  // El ID del producto y la cantidad vendida se pasan en el cuerpo de la solicitud

    try {
        // Buscar el producto
        const product = await ProductModel.findOne({ where: { idProducto } });

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Calcular el nuevo stock
        const nuevoStock = product.stock - cantidadVendida;

        if (nuevoStock < 0) {
            return res.status(400).json({ message: 'No hay suficiente stock para realizar la venta' });
        }

        // Actualizar el stock
        await product.update({ stock: nuevoStock });

        res.json({ message: 'Stock actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
