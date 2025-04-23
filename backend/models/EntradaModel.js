// EntradaModel.js
import db from "../lib/database.js";
import { DataTypes } from "sequelize";
import ProveedorModel from "./ProveedorModel.js";
import UsuarioModel from "./CredencialModel.js";

// Definición del modelo de Entrada
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

// Importación dinámica para evitar dependencia circular
(async () => {
    const EntradaProductoModel = (await import("./EntradaProductoModel.js")).default;

    // Relaciones
    EntradaModel.belongsTo(ProveedorModel, { foreignKey: 'idProveedor', as: 'proveedor' });
    EntradaModel.belongsTo(UsuarioModel, { foreignKey: 'idUsuario', as: 'usuario' });
    EntradaModel.hasMany(EntradaProductoModel, { foreignKey: 'idEntrada', as: 'productos' });
})();

export default EntradaModel;
