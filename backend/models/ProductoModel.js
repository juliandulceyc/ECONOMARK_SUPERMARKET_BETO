// ProductoModel.js
import db from "../lib/database.js";
import { DataTypes } from "sequelize";
import EntradaProductoModel from "./EntradaProductoModel.js"; // Importamos la tabla intermedia

const ProductModel = db.define('productos', {
    idProducto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombreProducto: { type: DataTypes.STRING(255), allowNull: false },
    idCategoria: { type: DataTypes.STRING(50), allowNull: false },
    precioVenta: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    estado: { type: DataTypes.STRING(20), allowNull: false }
}, {
    tableName: 'productos', timestamps: true
});

// Relaciones
ProductModel.hasMany(EntradaProductoModel, { foreignKey: 'idProducto', as: 'entradas' }); // Relación con la tabla intermedia

export default ProductModel;
