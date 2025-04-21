// Importamos el modelo
import VentaModel from "../models/VentasModel.js";
import DetalleVentaModel from "../models/DetalleVentasModel.js";
import ClienteModel from "../models/ClientesModel.js";

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


// ** Métodos para el CRUD ** //

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

export const createVenta = async (req, res) => {
    const { detalle, idCliente, ...ventaBase } = req.body;

    try {
        // Verificamos si el cliente existe
        let clienteId = 0;  // Por defecto, cliente anónimo
        if (idCliente) {
            const cliente = await ClienteModel.findByPk(idCliente);
            if (cliente) {
                clienteId = idCliente;  // Si el cliente está registrado, usamos su id
            }
        }

        // Generar datos del comprobante
        const comprobante = await generarComprobante(ventaBase.tipo_comprobante);

        // Crear la venta con los datos del comprobante y el idCliente (que puede ser 0)
        const nuevaVenta = await VentaModel.create({
            ...ventaBase,
            idCliente: clienteId, // Aquí asignamos el idCliente (0 si no está registrado)
            ...comprobante
        });

        // Crear los detalles de venta asociados
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


