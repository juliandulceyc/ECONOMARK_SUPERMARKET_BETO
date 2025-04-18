// Importamos el modelo
import DetalleEntradaModel from "../models/DetalleEntradasModel.js";

// ** Métodos para el CRUD ** //

// Mostrar todos los registros
export const getAllDetalleEntradas = async (req, res) => {
    try {
        const detalles = await DetalleEntradaModel.findAll();
        res.json(detalles);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getDetalleEntrada = async (req, res) => {
    try {
        const detalle = await DetalleEntradaModel.findAll({
            where: { idDetalle_entrada: req.params.id }
        });
        res.json(detalle[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createDetalleEntrada = async (req, res) => {
    try {
        await DetalleEntradaModel.create(req.body);
        res.json({ message: "¡Registro creado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateDetalleEntrada = async (req, res) => {
    try {
        await DetalleEntradaModel.update(req.body, {
            where: { idDetalle_entrada: req.params.id }
        });
        res.json({ message: "¡Registro actualizado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un registro
export const deleteDetalleEntrada = async (req, res) => {
    try {
        await DetalleEntradaModel.destroy({
            where: { idDetalle_entrada: req.params.id }
        });
        res.json({ message: "¡Registro eliminado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
