//importamos la conexion a la base de datos 
import db from "../lib/database.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const CredencialModel = db.define('proveedores', {
    rol: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
})

export default ProveedorModel