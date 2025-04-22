import bcrypt from 'bcrypt';
import CredencialModel from "../models/CredencialModel.js";

// Mostrar todos los registros 
export const getAllCredenciales = async (req, res) => {
    try {
        const credenciales = await CredencialModel.findAll();
        res.json(credenciales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Mostrar un registro 
export const getCredencial = async (req, res) => {
    try {
        const credencial = await CredencialModel.findAll({
            where: { id: req.params.id }
        });

        if (!credencial.length) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(credencial[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Crear un registro 
export const createCredencial = async (req, res) => {
    const { rol, username, correo, password } = req.body;

    if (!rol || !username || !correo || !password) {
        return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await CredencialModel.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: "El nombre de usuario ya está en uso" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await CredencialModel.create({ rol, username, correo, password: hashPassword });
        res.json({ message: "¡Registro creado correctamente!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar un registro 
export const updateCredencial = async (req, res) => {
    const { rol, username, correo, password } = req.body;

    if (!rol || !username || !correo) {
        return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    try {
        const updateData = { rol, username, correo };
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10);
            updateData.password = hashPassword;
        }

        const [updated] = await CredencialModel.update(updateData, { where: { id: req.params.id } });
        if (updated === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "¡Registro actualizado correctamente!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Eliminar un registro 
export const deleteCredencial = async (req, res) => {
    try {
        const deleted = await CredencialModel.destroy({ where: { id: req.params.id } });
        if (deleted === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "¡Registro eliminado correctamente!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
