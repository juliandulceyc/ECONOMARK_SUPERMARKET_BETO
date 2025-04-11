import express from 'express'
import { connectToDataBase } from '../lib/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Registro
router.post('/register', async (req, res) => {
    const { rol, username, password } = req.body;
    try {
        const db = await connectToDataBase();
        const [rows] = await db.query('SELECT * FROM credenciales WHERE username = ?', [username]);

        if (rows.length > 0) {
            return res.status(409).json({ success: false, message: "Usuario ya existe" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO credenciales (rol, username, password) VALUES (?,?,?)',
            [rol, username, hashPassword]
        );

        return res.status(201).json({ success: true, message: 'Registro exitoso' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const db = await connectToDataBase();
        const [rows] = await db.query('SELECT * FROM credenciales WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "El Usuario no existe" });
        }

        const isMatch = await bcrypt.compare(password, rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Contraseña errónea' });
        }

        const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, { expiresIn: '3h' });

        return res.status(200).json({
            success: true,
            token: token,
            userId: rows[0].id,
            rol: rows[0].rol,
            message: 'Inicio de sesión exitoso'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// Middleware para proteger rutas
const verifyToken = async (req, res, next) => {
    try {
        const tokenHeader = req.headers['authorization'];
        if (!tokenHeader) {
            return res.status(403).json({ success: false, message: 'Token no proporcionado' });
        }

        const token = tokenHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;

        const db = await connectToDataBase();
        const [rows] = await db.query('SELECT rol FROM credenciales WHERE id = ?', [req.userId]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        req.userRole = rows[0].rol;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
    }
};

// Ruta protegida (ejemplo)
router.get('/home', verifyToken, async (req, res) => {
    try {
        const db = await connectToDataBase();
        const [rows] = await db.query('SELECT * FROM credenciales WHERE id = ?', [req.userId]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ success: true, user: rows[0] });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

export default router;
