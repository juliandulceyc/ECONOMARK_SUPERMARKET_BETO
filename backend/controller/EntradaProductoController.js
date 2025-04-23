// controllers/EntradaProductoController.js
import EntradaProductoModel from "../models/EntradaProductoModel.js";
import EntradaModel from "../models/EntradaModel.js";
import ProductoModel from "../models/ProductoModel.js";

// Mostrar todos los registros
export const getAllEntradaProductos = async (req, res) => {
    try {
        const entradaProductos = await EntradaProductoModel.findAll({
            include: [
                { model: EntradaModel, as: "entrada" },
                { model: ProductoModel, as: "producto" },
            ]
        });
        res.json(entradaProductos);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro por ID
export const getEntradaProducto = async (req, res) => {
    try {
        const entradaProducto = await EntradaProductoModel.findOne({
            where: { idEntradaProducto: req.params.id },
            include: [
                { model: EntradaModel, as: "entrada" },
                { model: ProductoModel, as: "producto" },
            ]
        });
        if (!entradaProducto) {
            return res.status(404).json({ message: "EntradaProducto no encontrado" });
        }
        res.json(entradaProducto);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un nuevo registro
export const createEntradaProducto = async (req, res) => {
    const { idEntrada, idProducto, cantidad } = req.body;

    try {
        const nuevaEntradaProducto = await EntradaProductoModel.create({
            idEntrada,
            idProducto,
            cantidad
        });
        res.json({ message: "¡Registro creado correctamente!", nuevaEntradaProducto });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro existente
export const updateEntradaProducto = async (req, res) => {
    try {
        const entradaProducto = await EntradaProductoModel.findOne({ where: { idEntradaProducto: req.params.id } });
        if (!entradaProducto) {
            return res.status(404).json({ message: "EntradaProducto no encontrado" });
        }

        const { idEntrada, idProducto, cantidad } = req.body;
        await entradaProducto.update({ idEntrada, idProducto, cantidad });

        res.json({ message: "¡Registro actualizado correctamente!", entradaProducto });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un registro
export const deleteEntradaProducto = async (req, res) => {
    try {
        const rowsDeleted = await EntradaProductoModel.destroy({
            where: { idEntradaProducto: req.params.id }
        });
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: "EntradaProducto no encontrado" });
        }
        res.json({ message: "¡Registro eliminado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar cantidad de productos en una entrada
export const updateCantidadEntradaProducto = async (req, res) => {
    const { idEntradaProducto, cantidad } = req.body;  // El ID de la entrada_producto y la nueva cantidad

    try {
        // Buscar el registro
        const entradaProducto = await EntradaProductoModel.findOne({ where: { idEntradaProducto } });

        if (!entradaProducto) {
            return res.status(404).json({ message: "EntradaProducto no encontrado" });
        }

        // Actualizar la cantidad
        await entradaProducto.update({ cantidad });

        res.json({ message: "Cantidad actualizada correctamente", entradaProducto });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
