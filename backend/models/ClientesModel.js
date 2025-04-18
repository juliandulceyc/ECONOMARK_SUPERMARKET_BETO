//importamos la conexion a la base de datos 
import db from "../lib/database.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const ClientesModel = db.define('clientes', {
    idCliente: { type:DataTypes.NUMBER, primaryKey: true},
    nombreCliente: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING }
})

export default ClientesModel