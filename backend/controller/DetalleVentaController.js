// Importamos el modelo
import DetalleVentaModel from "../models/DetalleVentasModel.js";

// ** Métodos para el CRUD ** //

// Mostrar todos los registros
export const getAllDetalleVentas = async (req, res) => {
    try {
        const detalleVentas = await DetalleVentaModel.findAll();
        res.json(detalleVentas);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getDetalleVenta = async (req, res) => {
    try {
        const detalleVenta = await DetalleVentaModel.findOne({
            where: { idDetalle_venta: req.params.id }
        });
        res.json(detalleVenta);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createDetalleVenta = async (req, res) => {
    try {
        await DetalleVentaModel.create(req.body);
        res.json({ message: "¡Detalle de venta creado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateDetalleVenta = async (req, res) => {
    try {
        await DetalleVentaModel.update(req.body, {
            where: { idDetalle_venta: req.params.id }
        });
        res.json({ message: "¡Detalle de venta actualizado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un registro
export const deleteDetalleVenta = async (req, res) => {
    try {
        await DetalleVentaModel.destroy({
            where: { idDetalle_venta: req.params.id }
        });
        res.json({ message: "¡Detalle de venta eliminado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
