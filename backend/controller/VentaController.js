// Importamos los modelos
import VentaModel from "../models/VentasModel.js";
import DetalleVentaModel from "../models/DetalleVentasModel.js";
import ClienteModel from "../models/ClientesModel.js";
import ProductoModel from "../models/ProductoModel.js";
import { Sequelize } from "sequelize";

const generarComprobante = async (tipo) => {
    const serie = tipo === "Factura" ? "F001" : "B001";

    const ultimaVenta = await VentaModel.findOne({
        where: { tipo_comprobante: tipo, serie_comprobante: serie },
        order: [['num_comprobante', 'DESC']]
    });

    let ultimoNumero = 0;
    if (ultimaVenta) {
        ultimoNumero = parseInt(ultimaVenta.num_comprobante);
    }

    const nuevoNumero = String(ultimoNumero + 1).padStart(6, '0');

    return { tipo_comprobante: tipo, serie_comprobante: serie, num_comprobante: nuevoNumero };
};

// Mostrar todos los registros
export const getAllVentas = async (req, res) => {
    try {
        const ventas = await VentaModel.findAll();
        res.json(ventas);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Mostrar un registro
export const getVenta = async (req, res) => {
    try {
        const venta = await VentaModel.findAll({
            where: { idVenta: req.params.id }
        });
        res.json(venta[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear venta con detalles
export const createVenta = async (req, res) => {
    const { detalle, idCliente, ...ventaBase } = req.body;

    try {
        let clienteId = 0;
        if (idCliente) {
            const cliente = await ClienteModel.findByPk(idCliente);
            if (cliente) {
                clienteId = idCliente;
            }
        }

        const comprobante = await generarComprobante(ventaBase.tipo_comprobante);

        const nuevaVenta = await VentaModel.create({
            ...ventaBase,
            idCliente: clienteId,
            ...comprobante
        });

        if (detalle && Array.isArray(detalle)) {
            for (const item of detalle) {
                await DetalleVentaModel.create({
                    idVenta: nuevaVenta.idVenta,
                    ...item
                });
            }
        }

        res.json({ message: "¡Venta registrada correctamente!", idVenta: nuevaVenta.idVenta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un registro
export const updateVenta = async (req, res) => {
    try {
        await VentaModel.update(req.body, {
            where: { idVenta: req.params.id }
        });
        res.json({ message: "¡Registro actualizado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un registro
export const deleteVenta = async (req, res) => {
    try {
        await VentaModel.destroy({
            where: { idVenta: req.params.id }
        });
        res.json({ message: "¡Registro eliminado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener resumen de ventas por producto
export const getResumenVentasPorProducto = async (req, res) => {
    try {
        const resumen = await DetalleVentaModel.findAll({
            attributes: [
                'idProducto',
                [Sequelize.fn('SUM', Sequelize.col('cantidad')), 'totalCantidad']
            ],
            include: [
                {
                    model: ProductoModel,
                    as: 'producto',
                    attributes: ['nombreProducto']
                }
            ],
            group: ['idProducto', 'producto.idProducto']
        });

        res.json(resumen);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
