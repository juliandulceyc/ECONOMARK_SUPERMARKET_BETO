//importamos la conexion a la base de datos 
import db from "../lib/database.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const ProductModel = db.define('productos', {
    idProducto: { type: DataTypes.NUMBER, primaryKey: true},
    nombreProducto: { type: DataTypes.STRING },
    idCategoria: { type: DataTypes.STRING },
    precioVenta: { type: DataTypes.DECIMAL },
    stock:  { type: DataTypes.INTEGER },
    estado: { type: DataTypes.STRING },
})

export default ProductModel