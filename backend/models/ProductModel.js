//importamos la conexion a la base de datos 
import db from "../lib/database.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const ProductModel = db.define('productos', {
    id: { type: DataTypes.NUMBER, primaryKey: true},
    nombre: { type: DataTypes.STRING },
    categoria: { type: DataTypes.STRING },
    precio: { type: DataTypes.DECIMAL }
})

export default ProductModel