import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import authRouter from './routes/authRoutes.js'
import routes from './routes/routes.js'
import routesCredenciales from './routes/routesCredenciales.js'
import routesCategorias from './routes/routesCategorias.js'
import routesProveedores from './routes/routesProveedores.js'
import routesClientes from './routes/routesClientes.js'
import routesEntradas from './routes/routesEntradas.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/productos', routes)
app.use('/credenciales', routesCredenciales)
app.use('/categorias', routesCategorias)
app.use('/proveedores', routesProveedores)
app.use('/clientes', routesClientes)
app.use('/entradas', routesEntradas)

// Escuchar puerto
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`✓ Escuchando en el puerto: ${PORT}`)
})
