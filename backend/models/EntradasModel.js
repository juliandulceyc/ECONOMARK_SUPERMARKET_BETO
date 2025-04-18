import db from "../lib/database.js"; 
import { DataTypes } from "sequelize"; 
import ProveedorModel from "./ProveedorModel.js"; 
import UsuarioModel from "./CredencialModel.js";

const EntradaModel = db.define('entradas', {
    idEntrada: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    idProveedor: { type: DataTypes.INTEGER, allowNull: false }, 
    idUsuario: { type: DataTypes.INTEGER, allowNull: false }, 
    tipo_comprobante: { type: DataTypes.STRING(20), allowNull: false }, 
    serie_comprobante: { type: DataTypes.STRING(7) }, 
    num_comprobante: { type: DataTypes.STRING(10), allowNull: false }, 
    fecha: { type: DataTypes.DATE, allowNull: false }, 
    impuesto: { type: DataTypes.DECIMAL(4, 2), allowNull: false }, 
    total: { type: DataTypes.DECIMAL(11, 2), allowNull: false }, 
    estado: { type: DataTypes.STRING(20), allowNull: false }
}, {
    tableName: 'entradas', timestamps: true
});

EntradaModel.belongsTo(ProveedorModel, { foreignKey: 'idProveedor', as: 'proveedor' });
EntradaModel.belongsTo(UsuarioModel, { foreignKey: 'idUsuario', as: 'usuario' });

export default EntradaModel;
