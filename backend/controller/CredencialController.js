import bcrypt from 'bcrypt';
import CredencialModel from "../models/CredencialModel.js";

//** Métodos para el CRUD **//

// Mostrar todos los registros 
export const getAllCredenciales = async (req, res) => {
    try {
        const credenciales = await CredencialModel.findAll();
        res.json(credenciales);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro 
export const getCredencial = async (req, res) => {
    try {
        const credencial = await CredencialModel.findAll({
            where: { id: req.params.id }
        });
        res.json(credencial[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un registro 
export const createCredencial = async (req, res) => {
    const { rol, username, password } = req.body;
    try {
        // Encriptar el password antes de guardar
        const hashPassword = await bcrypt.hash(password, 10);
        await CredencialModel.create({ rol, username, password: hashPassword });
        res.json({ message: "¡Registro creado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un registro 
export const updateCredencial = async (req, res) => {
    const { rol, username, password } = req.body;
    try {
        // Encriptar el password antes de actualizar, si se proporciona
        const hashPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updateData = { rol, username };
        if (hashPassword) updateData.password = hashPassword;

        await CredencialModel.update(updateData, { where: { id: req.params.id } });
        res.json({ message: "¡Registro actualizado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un registro 
export const deleteCredencial = async (req, res) => {
    try {
        await CredencialModel.destroy({ where: { id: req.params.id } });
        res.json({ message: "¡Registro eliminado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
