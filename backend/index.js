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
import swaggerDocument from './docs/swagger.json';

const app = express()

app.use(express.json())
app.use(helmet())


// Permite cualquier origin durante pruebas
app.use(cors({
  origin: (origin, callback) => {
    // Permite solicitudes sin origin (como Postman) o desde cualquier frontend
    callback(null, true);
  },
  credentials: true
}))

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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
