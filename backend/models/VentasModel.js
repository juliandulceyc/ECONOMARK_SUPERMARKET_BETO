// importamos la conexión a la base de datos
import db from "../lib/database.js";
// importamos sequelize
import { DataTypes } from "sequelize";

const VentaModel = db.define('venta', {
    idVenta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idCliente: { type: DataTypes.INTEGER,allowNull: false},
    idUsuario: { type: DataTypes.INTEGER,allowNull: false },
    tipo_comprobante: { type: DataTypes.STRING(20), allowNull: false },
    serie_comprobante: { type: DataTypes.STRING(7) },
    num_comprobante: { type: DataTypes.STRING(10), allowNull: false },
    fecha_hora: { type: DataTypes.DATE,allowNull: false },
    impuesto: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
    total: { type: DataTypes.DECIMAL(11, 2), allowNull: false },
    estado: { type: DataTypes.STRING(20), allowNull: false}
});

export default VentaModel;
