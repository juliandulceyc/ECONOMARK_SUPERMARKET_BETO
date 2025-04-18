import db from "../lib/database.js";
import { DataTypes } from "sequelize";
import EntradaModel from './EntradaModel.js';
import ProductoModel from './ProductoModel.js';

const DetalleEntradaModel = db.define('detalle_entradas', {
    idDetalle_entrada: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    idEntrada: {type: DataTypes.INTEGER,allowNull: false},
    idProducto: {type: DataTypes.INTEGER,allowNull: false},
    cantidad: {type: DataTypes.INTEGER, allowNull: false},
    precio: {type: DataTypes.DECIMAL(11, 2),allowNull: false}
});

// Asociaciones
DetalleEntradaModel.belongsTo(EntradaModel, { foreignKey: 'idEntrada',onDelete: 'CASCADE' });

DetalleEntradaModel.belongsTo(ProductoModel, { foreignKey: 'idProducto' });

export default DetalleEntradaModel;
