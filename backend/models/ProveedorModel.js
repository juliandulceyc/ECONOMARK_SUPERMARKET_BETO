import db from "../lib/database.js";
import { DataTypes } from "sequelize";

const ProveedorModel = db.define('proveedores', {
    idProveedor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombreProveedor: { type: DataTypes.STRING(100), allowNull: false },
    telefono: { type: DataTypes.STRING(20), allowNull: false },
    direccion: { type: DataTypes.STRING(150), allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW }
}, {
    timestamps: true,
    tableName: 'proveedores'
});

export default ProveedorModel;
