// Importamos el modelo
import EntradaModel from "../models/EntradasModel.js";

// ** Métodos para el CRUD ** //

// Mostrar todos los registros
export const getAllEntradas = async (req, res) => {
    try {
        const entradas = await EntradaModel.findAll();
        res.json(entradas);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getEntrada = async (req, res) => {
    try {
        const entrada = await EntradaModel.findOne({
            where: { idEntrada: req.params.id }
        });
        res.json(entrada);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro
export const createEntrada = async (req, res) => {
    try {
        await EntradaModel.create(req.body);
        res.json({ message: "¡Entrada creada correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro
export const updateEntrada = async (req, res) => {
    try {
        await EntradaModel.update(req.body, {
            where: { idEntrada: req.params.id }
        });
        res.json({ message: "¡Entrada actualizada correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un registro
export const deleteEntrada = async (req, res) => {
    try {
        await EntradaModel.destroy({
            where: { idEntrada: req.params.id }
        });
        res.json({ message: "¡Entrada eliminada correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
