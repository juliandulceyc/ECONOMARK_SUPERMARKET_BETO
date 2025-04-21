import React, { useState, useEffect } from 'react';
import './ventas.css';
import Logo from './carrito-de-compras.png';
import API from './services/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCashRegister } from '@fortawesome/free-solid-svg-icons';
import FacturaModal from './FacturaModal';
import ClienteModal from './ClienteModal'; // Importa el ClienteModal

const Ventas = () => {
  const [codigoProducto, setCodigoProducto] = useState('');
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [productosEnVenta, setProductosEnVenta] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [listaProductos, setListaProductos] = useState([]);
  const [totalVenta, setTotalVenta] = useState(0);
  const [mostrarModalFactura, setMostrarModalFactura] = useState(false);
  const [datosVenta, setDatosVenta] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [mostrarModalCliente, setMostrarModalCliente] = useState(false); // Estado para el modal de cliente
  const [clientes, setClientes] = useState([]); // Estado para almacenar la lista de clientes

  useEffect(() => {
    const clienteGuardado = localStorage.getItem("cliente");
    if (clienteGuardado) {
      setCliente(JSON.parse(clienteGuardado));
    }
  }, []);

  // Cargar clientes cuando el componente se monte
  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await API.get('/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };
    obtenerClientes();
  }, []);

  const buscarProducto = async () => {
    try {
      const response = await API.get(`/productos/${codigoProducto}`);
      setProducto(response.data);
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      setProducto(null);
    }
  };

  const obtenerListaProductos = async () => {
    try {
      const response = await API.get('/productos');
      setListaProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const agregarProducto = () => {
    if (producto) {
      const productoConCantidad = {
        ...producto,
        cantidad,
        total: producto.precioVenta * cantidad,
      };
      setProductosEnVenta([...productosEnVenta, productoConCantidad]);
      setTotalVenta(prevTotal => prevTotal + productoConCantidad.total);

      setCodigoProducto('');
      setProducto(null);
      setCantidad(1);
    }
  };

  const abrirModalCliente = () => {
    setMostrarModalCliente(true); // Abrir el modal de selección de cliente
  };

  const seleccionarCliente = (clienteSeleccionado) => {
    setCliente(clienteSeleccionado); // Guardar el cliente seleccionado
    localStorage.setItem("cliente", JSON.stringify(clienteSeleccionado)); // Guardar cliente en localStorage
    setMostrarModalCliente(false); // Cerrar el modal
  };

  const calcularTotalVenta = () => {
    return productosEnVenta.reduce((total, producto) => total + producto.total, 0);
  };

  const abrirModal = () => {
    obtenerListaProductos();
    setMostrarModal(true);
  };

  const seleccionarProductoDelModal = (productoSeleccionado) => {
    setProducto(productoSeleccionado);
    setCodigoProducto(productoSeleccionado.idProducto || '');
    setMostrarModal(false);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const generarFactura = () => {
    const ventaGenerada = {
      id: new Date().getTime(),
      fecha: new Date().toLocaleString(),
      productos: productosEnVenta,
      total: calcularTotalVenta(),
    };
    setDatosVenta(ventaGenerada);
    setMostrarModalFactura(true);
  };

  const descontarStock = async () => {
    try {
      for (let productoVenta of productosEnVenta) {
        const nuevoStock = productoVenta.stock - productoVenta.cantidad;
        await API.put(`/productos/${productoVenta.idProducto}`, {
          stock: nuevoStock
        });
      }
    } catch (error) {
      console.error("Error al descontar el stock:", error);
    }
  };

  const manejarCobro = async () => {
    if (productosEnVenta.length === 0) {
      alert("Agrega productos antes de cobrar.");
      return;
    }

    try {
      await descontarStock();

      const ventaData = {
        idCliente: cliente ? cliente.idCliente : 0,
        idUsuario: 1,
        tipo_comprobante: 'Factura',
        fecha_hora: new Date().toISOString(),
        impuesto: 0.18,
        total: calcularTotalVenta(),
        estado: 'Emitido',
        detalle: productosEnVenta.map(producto => ({
          idProducto: producto.idProducto,
          cantidad: producto.cantidad,
          precio: producto.precioVenta,
          descuento: 0
        }))
      };

      const response = await API.post('/ventas', ventaData);
      console.log(response.data.message);

      generarFactura();

      setProductosEnVenta([]);
      setTotalVenta(0);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      alert("Ocurrió un error al registrar la venta.");
    }
  };

  useEffect(() => {
    if (codigoProducto) {
      buscarProducto();
    }
  }, [codigoProducto]);

  return (
    <div className="ventas-container">
      <header className="ventas-header">
        <img src={Logo} alt="Carrito de compras" />
      </header>

      <section className="ventas-button-row">
        {Array.from({ length: 13 }, (_, index) => (
          <button key={index} className="ventas-button">Botón</button>
        ))}
      </section>

      <section className="ventas-product-entry">
        <div className="ventas-titulo-container">
          <h2 className="ventas-titulo-gradiente">VENTA DE PRODUCTOS</h2>
        </div>

        <div className="ventas-controls-line">
          <div className="input-group">
            <label>Código del producto:</label>
            <input
              type="text"
              className="input"
              maxLength="15"
              value={codigoProducto}
              onChange={(e) => setCodigoProducto(e.target.value)}
            />
            <button className="ventas-add-btn" onClick={abrirModal}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button className="ventas-add-btn" onClick={agregarProducto}>
              <FontAwesomeIcon icon={faCashRegister} />
            </button>
          </div>

          <div className="input-group">
            <label>Cantidad:</label>
            <input
              type="number"
              className="input"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              min="1"
            />
          </div>

          <button className="action-btn" onClick={agregarProducto}>Agregar a la venta</button>
          <button className="action-btn" onClick={abrirModalCliente}>Seleccionar cliente</button>
          <button className="action-btn">Vender a granel</button>
          <button className="action-btn">Venta en espera</button>
        </div>
        <div className='ventas-separator' />
      </section>

      <section className="ventas-product-list">
        <table>
          <thead>
            <tr>
              <th>No. de producto</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {productosEnVenta.map((producto, index) => (
              <tr key={index}>
                <td>{producto.idProducto}</td>
                <td>{producto.codigo}</td>
                <td>{producto.nombreProducto}</td>
                <td>{producto.cantidad}</td>
                <td>${producto.precioVenta}</td>
                <td>${producto.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="ventas-actions">
        <div className="ventas-buttons-container">
          <div className="ventas-actions-grid">
            <button className="action-btn">Artículo común</button>
            <button className="action-btn">Datos extra al ticket</button>
            <button className="action-btn">F11 - Búsqueda rápida</button>
            <button className="action-btn">Cancelar venta</button>
            <button className="action-btn">Editar venta</button>
            <button className="action-btn">Reimprimir último ticket</button>
          </div>
        </div>
        <div className="ventas-payment-col">
          <button className="ventas-cobrar" onClick={manejarCobro}>F12 - Cobrar</button>
          <div className="ventas-total">Total: ${calcularTotalVenta().toFixed(2)}</div>
        </div>
      </section>

      <footer className="ventas-footer">
        <div className="ventas-footer-content">
          <div>Cajero en turno: Jefferson Andres Contreras</div>
          <div>14:24</div>
        </div>
      </footer>

      {mostrarModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Seleccionar producto</h3>
            <button className="modal-close" onClick={cerrarModal}>✖</button>
            <table className="modal-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {listaProductos.map((producto) => (
                  <tr key={producto.idProducto}>
                    <td>{producto.idProducto}</td>
                    <td>{producto.nombreProducto}</td>
                    <td>
                      <button onClick={() => seleccionarProductoDelModal(producto)}>
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {mostrarModalCliente && (
        <ClienteModal
          showModal={mostrarModalCliente}
          handleClose={() => setMostrarModalCliente(false)}
          clientes={clientes}
          handleSelectCliente={seleccionarCliente}
        />
      )}

      {mostrarModalFactura && datosVenta && (
        <FacturaModal
          show={mostrarModalFactura}
          onHide={() => setMostrarModalFactura(false)}
          datosVenta={datosVenta}
        />
      )}
    </div>
  );
};

export default Ventas;
