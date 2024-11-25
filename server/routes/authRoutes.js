import express from 'express'
import  {connectToDataBase}  from '../lib/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res) => {
    const { rol, username, password } = req.body;
    try{
        const db = await connectToDataBase()
        const [rows] = await db.query('SELECT * FROM credenciales WHERE username = ?', [username])
        if(rows.length > 0) {
            return res.status(409).json({message : "Usuario ya existe"})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await db.query('INSERT INTO credenciales (rol, username, password) VALUES (?,?,?)',
            [rol, username, hashPassword])

        return res.status(201).json({message: 'Registro exitoso'})
    } catch {
        return res.status(500).json(console.error());
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try{
        const db = await connectToDataBase()
        const [rows] = await db.query('SELECT * FROM credenciales WHERE username = ?', [username])
        if(rows.length === 0) {
            return res.status(404).json({message : "El Usuario no existe"})
        }
        const isMatch = await bcrypt.compare(password, rows[0].password)
        if(!isMatch){
            return res.status(401).json({message: 'Contraseña erronea'})
        }
        const token = jwt.sign({id: rows[0].id}, process.env.JWT_KEY, {expiresIn: '3h'})
        return res.status(201).json({token: token})
    } catch {
        return res.status(500).json(console.error());
    }
})

const verifyToken =  async (req, res, next) => {
    try{
        const token = req.headers['authorization'].split(' ')[1];
        if(!token){
            res.status(503).json({message: 'Token no proporcionado'})
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id;
    }catch(err) {
        return res.status(500).json({message: 'Error en el servidor'})
    }
}

router.get('/home', verifyToken, async (req, res) => {
    try{
        const db = await connectToDataBase()
        const [rows] = await db.query('SELECT * FROM credenciales WHERE id = ?', [req.userId])
        if(rows.length === 0) {
            return res.status(404).json({message : "Usuario ya existe"})
        }
        return res.status(201).json({user: rows[0]})
    }catch(err) {

    }
})

export default router; 