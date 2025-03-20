import express from 'express';
import { connectToDataBase } from '../lib/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registrar proveedor
router.post('/register', async (req, res) => {
    const { nombre, contacto, telefono, email, direccion } = req.body;
    try {
        const db = await connectToDataBase();
        const [rows] = await db.query('SELECT * FROM proveedores WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: "El proveedor ya está registrado" });
        }

        await db.query('INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)', 
            [nombre, contacto, telefono, email, direccion]);

        return res.status(201).json({ message: 'Proveedor registrado con éxito' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Obtener información de todos los proveedores
router.get('/list', async (req, res) => {
    try {
        const db = await connectToDataBase();
        const [rows] = await db.query('SELECT * FROM proveedores');
        return res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Actualizar información de un proveedor
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, contacto, telefono, email, direccion } = req.body;
    try {
        const db = await connectToDataBase();
        const [result] = await db.query(
            'UPDATE proveedores SET nombre = ?, contacto = ?, telefono = ?, email = ?, direccion = ? WHERE id = ?',
            [nombre, contacto, telefono, email, direccion, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        return res.status(200).json({ message: 'Proveedor actualizado con éxito' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Eliminar un proveedor
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectToDataBase();
        const [result] = await db.query('DELETE FROM proveedores WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        return res.status(200).json({ message: 'Proveedor eliminado con éxito' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

export default router;
