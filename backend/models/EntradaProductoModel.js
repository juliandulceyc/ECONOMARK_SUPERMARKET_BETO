import db from "../lib/database.js";
import { DataTypes } from "sequelize";

// Definir el modelo EntradaProducto sin las relaciones aún
const EntradaProductoModel = db.define('entrada_producto', {
    idEntradaProducto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idEntrada: { type: DataTypes.INTEGER, allowNull: false },
    idProducto: { type: DataTypes.INTEGER, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'entrada_producto',
    timestamps: false,
});

// Relación con el modelo Producto
(async () => {
    const ProductModel = (await import("./ProductoModel.js")).default;
    const EntradaModel = (await import("./EntradaModel.js")).default;

    EntradaProductoModel.belongsTo(EntradaModel, { foreignKey: 'idEntrada', as: 'entrada' });
    EntradaProductoModel.belongsTo(ProductModel, { foreignKey: 'idProducto', as: 'producto' });
})();

export default EntradaProductoModel;
