//importamos la conexion a la base de datos 
import db from "../lib/database.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const CategoriaModel = db.define('categoria', {
    idCategoria: { type:DataTypes.STRING, primaryKey: true},
    nombreCategoria: { type: DataTypes.STRING },
    descripcionCategoria: { type: DataTypes.STRING },
    estado: { type: DataTypes.BOOLEAN }
})

export default CategoriaModel