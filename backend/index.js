import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import ProductModel from './models/ProductModel.js'
import routes from './routes/routes.js'
import db from './lib/db.js'
import routesCredenciales from './routes/routesCredenciales.js'
import routesCategorias from './routes/routesCategorias.js'



const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/tablas', routes)
app.use('/credenciales', routesCredenciales)
app.use('/categorias', routesCategorias)

app.listen(process.env.PORT, () => {
    console.log(`✓ Escuchando en el puerto: ${process.env.PORT}`)
});
