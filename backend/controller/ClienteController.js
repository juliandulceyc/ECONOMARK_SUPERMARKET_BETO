// Importamos el modelo
import ClienteModel from "../models/ClientesModel.js"

// ** Métodos para el CRUD ** //

// Mostrar todos los registros
export const getAllClientes = async (req, res) => {
    try {
        const clientes = await ClienteModel.findAll();
        res.json(clientes);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.findOne({
            where: { idCliente: req.params.id }
        });
        res.json(cliente);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createCliente = async (req, res) => {
    try {
        await ClienteModel.create(req.body);
        res.json({ message: "¡Registro creado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateCliente = async (req, res) => {
    try {
        await ClienteModel.update(req.body, {
            where: { idCliente: req.params.id }
        });
        res.json({ message: "¡Registro actualizado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un registro
export const deleteCliente = async (req, res) => {
    try {
        await ClienteModel.destroy({
            where: { idCliente: req.params.id }
        });
        res.json({ message: "¡Registro eliminado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
