// Importamos el modelo
import ProveedorModel from "../models/ProveedorModel.js";

// ** Métodos para el CRUD ** //

// Mostrar todos los registros
export const getAllProveedores = async (req, res) => {
    try {
        const proveedores = await ProveedorModel.findAll();
        res.json(proveedores);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getProveedor = async (req, res) => {
    try {
        const proveedor = await ProveedorModel.findOne({
            where: { idProveedor: req.params.id }
        });
        res.json(proveedor);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createProveedor = async (req, res) => {
    try {
        await ProveedorModel.create(req.body);
        res.json({ message: "¡Proveedor creado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateProveedor = async (req, res) => {
    try {
        await ProveedorModel.update(req.body, {
            where: { idProveedor: req.params.id }
        });
        res.json({ message: "¡Proveedor actualizado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un registro
export const deleteProveedor = async (req, res) => {
    try {
        await ProveedorModel.destroy({
            where: { idProveedor: req.params.id }
        });
        res.json({ message: "¡Proveedor eliminado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
