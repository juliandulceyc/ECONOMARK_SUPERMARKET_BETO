import express from 'express'
import helmet from 'helmet'
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
import routesDetalleEntradas from './routes/routesDetalleEntradas.js'
import connectToDataBase from './lib/db.js';
import errorHandler from './middleware/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json' assert { type: 'json' };

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://172.210.65.94',
        'http://172.210.65.94:5173',
        'http://supermarketbeto.duckdns.org:5173',
        'https://supermarketbeto.duckdns.org' // <--- AGREGA ESTA LÍNEA
    ],
    credentials: true
}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/auth', authRouter)
app.use('/productos', routes)
app.use('/credenciales', routesCredenciales)
app.use('/categorias', routesCategorias)
app.use('/proveedores', routesProveedores)
app.use('/clientes', routesClientes)
app.use('/entradas', routesEntradas)
app.use('/detalle_entradas', routesDetalleEntradas)
app.use('/ventas', routesVentas)
app.use('/detalle_ventas', routesDetalleVentas)
app.use('/entrada_productos', routesEntradaProductos)

// Conectar a la base de datos
connectToDataBase();

// Al final de todas las rutas:
app.use(errorHandler);

// Escuchar puerto solo si no es test
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`✓ Escuchando en el puerto: ${PORT}`);
    });
}

export default app;
