import db from "../lib/database.js";
import { DataTypes } from "sequelize";

const ProveedorModel = db.define('proveedores', {
    idProveedor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombreProveedor: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    telefono: { type: DataTypes.STRING(20), allowNull: false },
}, {
    timestamps: true,
    tableName: 'proveedores'
});

export default ProveedorModel;
