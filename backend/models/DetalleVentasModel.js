// importamos la conexión a la base de datos
import db from "../lib/database.js";
import { DataTypes } from "sequelize";
// importamos los modelos relacionados
import VentaModel from './VentasModel.js';
import ProductoModel from './ProductoModel.js';


const DetalleVentaModel = db.define('detalle_venta', {
    idDetalle_venta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idVenta: { type: DataTypes.INTEGER,  allowNull: false },
    idProducto: { type: DataTypes.INTEGER, allowNull: false  },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    precio: { type: DataTypes.DECIMAL(11, 2), allowNull: false },
    descuento: { type: DataTypes.DECIMAL(11, 2), allowNull: false }
},{
    tableName: 'detalle_venta', timestamps: false
});

// Asociaciones
DetalleVentaModel.belongsTo(VentaModel, {
    foreignKey: 'idVenta',
    onDelete: 'CASCADE'
});

DetalleVentaModel.belongsTo(ProductoModel, {
    foreignKey: 'idProducto'
});

export default DetalleVentaModel;
