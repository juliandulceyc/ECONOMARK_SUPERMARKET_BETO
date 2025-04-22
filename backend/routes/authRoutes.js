import express from 'express'
import { connectToDataBase } from '../lib/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendResetEmail } from '../lib/mailer.js'

const router = express.Router()

// Middleware para proteger rutas
const verifyToken = async (req, res, next) => {
    try {
        const tokenHeader = req.headers['authorization']
        if (!tokenHeader) {
            return res.status(403).json({ success: false, message: 'Token no proporcionado' })
        }

        const token = tokenHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id

        const db = await connectToDataBase()
        const [rows] = await db.query('SELECT rol FROM credenciales WHERE id = ?', [req.userId])

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
        }

        req.userRole = rows[0].rol
        next()
    } catch (err) {
        console.error(err)
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expirado' })
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Token inválido' })
        }
        return res.status(500).json({ success: false, message: 'Error al verificar token' })
    }
}

// Rutas públicas
router.post('/register', async (req, res) => {
    const { rol, username, correo, password } = req.body

    if (!rol || !username || !correo || !password) {
        return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" })
    }

    try {
        const db = await connectToDataBase()

        // Validar duplicados
        const [existingUser] = await db.query('SELECT * FROM credenciales WHERE username = ?', [username])
        if (existingUser.length > 0) {
            return res.status(409).json({ success: false, message: "Usuario ya existe" })
        }

        const [existingEmail] = await db.query('SELECT * FROM credenciales WHERE correo = ?', [correo])
        if (existingEmail.length > 0) {
            return res.status(409).json({ success: false, message: "Correo ya registrado" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await db.query(
            'INSERT INTO credenciales (rol, username, correo, password) VALUES (?,?,?,?)',
            [rol, username, correo, hashPassword]
        )

        return res.status(201).json({ success: true, message: 'Registro exitoso' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error en el servidor' })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Nombre de usuario/correo y contraseña requeridos" })
    }

    try {
        const db = await connectToDataBase()

        // Buscar por username o correo
        const [rows] = await db.query(
            'SELECT * FROM credenciales WHERE username = ? OR correo = ?',
            [username, username]
        )

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Usuario o correo no encontrado' })
        }

        const user = rows[0]

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '3h' })

        return res.status(200).json({
            success: true,
            token,
            userId: user.id,
            rol: user.rol,
            message: 'Inicio de sesión exitoso'
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error en el servidor' })
    }
})


// Rutas protegidas
router.get('/home', verifyToken, async (req, res) => {
    try {
        const db = await connectToDataBase()
        const [rows] = await db.query('SELECT id, username, correo, rol FROM credenciales WHERE id = ?', [req.userId])

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
        }

        return res.status(200).json({ success: true, user: rows[0] })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Error en el servidor' })
    }
})

// Solicitar recuperación
router.post('/forgot-password', async (req, res) => {
    const { correo } = req.body
    if (!correo) return res.status(400).json({ success: false, message: "Correo requerido" })

    try {
        const db = await connectToDataBase()
        const [rows] = await db.query('SELECT * FROM credenciales WHERE correo = ?', [correo])
        const user = rows[0]

        if (!user) return res.status(404).json({ success: false, message: "Correo no encontrado" })

        const token = jwt.sign({ id: user.id }, process.env.JWT_RESET_KEY, { expiresIn: '15m' })

        await sendResetEmail(correo, token)

        res.status(200).json({ success: true, message: "Correo enviado" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, message: "Error del servidor" })
    }
})

// Resetear contraseña
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body
    if (!token || !newPassword) return res.status(400).json({ success: false, message: "Datos incompletos" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_RESET_KEY)
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        const db = await connectToDataBase()
        await db.query('UPDATE credenciales SET password = ? WHERE id = ?', [hashedPassword, decoded.id])

        res.status(200).json({ success: true, message: "Contraseña actualizada" })
    } catch (err) {
        console.error(err)
        res.status(400).json({ success: false, message: "Token inválido o expirado" })
    }
})

export default router
