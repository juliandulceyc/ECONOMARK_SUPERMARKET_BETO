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
import routesVentas from './routes/routesVentas.js'
import routesDetalleVentas from './routes/routesDetalleVentas.js'
import routesEntradaProductos from './routes/routesEntradaProductos.js'
import connectToDataBase from './lib/db.js';

const app = express()

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://172.210.65.94',         // IP pública de tu VM
        'http://172.210.65.94:5173'     // Si usas Vite en ese puerto
    ],
    credentials: true
}))
app.use(express.json())

app.use('/auth', authRouter)
app.use('/productos', routes)
app.use('/credenciales', routesCredenciales)
app.use('/categorias', routesCategorias)
app.use('/proveedores', routesProveedores)
app.use('/clientes', routesClientes)
app.use('/entradas', routesEntradas)
app.use('/detalle_entradas', routesEntradas)
app.use('/ventas', routesVentas)
app.use('/detalle_ventas', routesDetalleVentas)
app.use('/entrada_productos', routesEntradaProductos)

// Conectar a la base de datos
connectToDataBase();

// Escuchar puerto
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`✓ Escuchando en el puerto: ${PORT}`)
})
