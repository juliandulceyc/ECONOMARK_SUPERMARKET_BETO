import React, { useState, useEffect } from 'react';
import './ventas.css';
import Logo from './carrito-de-compras.png';
import API from './services/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCashRegister, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import FacturaModal from './FacturaModal';
import ClienteModal from './ClienteModal';
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';

const Ventas = ({ cajero }) => {
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
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [horaActual, setHoraActual] = useState(new Date().toLocaleTimeString());
  const [cronometroActivo, setCronometroActivo] = useState(false);
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const clienteGuardado = localStorage.getItem("cliente");
    if (clienteGuardado) setCliente(JSON.parse(clienteGuardado));

    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) setUsuario(JSON.parse(usuarioGuardado));

    const intervaloReloj = setInterval(() => {
      setHoraActual(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervaloReloj);
  }, []);

  useEffect(() => {
    let cronometroIntervalo;
    if (cronometroActivo) {
      cronometroIntervalo = setInterval(() => {
        setSegundos(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(cronometroIntervalo);
    }
    return () => clearInterval(cronometroIntervalo);
  }, [cronometroActivo]);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await API.get('/clientes');
        setClientes(response.data);
      } catch (error) {
        Swal.fire("Error", "Error al obtener los clientes", "error");
      }
    };
    obtenerClientes();
  }, []);

  const abrirTurno = () => {
    setCronometroActivo(true);
    setSegundos(0);
    Swal.fire("Turno iniciado", "El turno ha comenzado", "success");
  };

  const cerrarTurno = () => {
    setCronometroActivo(false);
    Swal.fire("Turno finalizado", `Tiempo trabajado: ${formatearTiempo(segundos)}`, "info");
  };

  const formatearTiempo = (seg) => {
    const h = Math.floor(seg / 3600);
    const m = Math.floor((seg % 3600) / 60);
    const s = seg % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const buscarProducto = async () => {
    try {
      const response = await API.get(`/productos/${codigoProducto}`);
      setProducto(response.data);
    } catch (error) {
      setProducto(null);
      Swal.fire("Producto no encontrado", "Verifica el código ingresado", "warning");
    }
  };

  const obtenerListaProductos = async () => {
    try {
      const response = await API.get('/productos');
      setListaProductos(response.data);
    } catch (error) {
      Swal.fire("Error", "No se pudo obtener la lista de productos", "error");
    }
  };

  const agregarProducto = () => {
    if (!producto) {
      Swal.fire("Advertencia", "Primero debes buscar o seleccionar un producto", "warning");
      return;
    }

    // Verificación de stock antes de agregar el producto
    if (producto.stock < cantidad) {
      Swal.fire("Stock insuficiente", `El producto ${producto.nombreProducto} no tiene suficiente stock`, "warning");
      return; // Si no hay suficiente stock, no se agrega el producto
    }

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
    Swal.fire("Agregado", "Producto agregado correctamente", "success");
  };


  const manejarCobro = async () => {
    if (productosEnVenta.length === 0) {
      Swal.fire("Advertencia", "Agrega productos antes de cobrar", "warning");
      return;
    }

    // Verificación de stock
    for (let productoVenta of productosEnVenta) {
      if (productoVenta.stock < productoVenta.cantidad) {
        Swal.fire("Stock insuficiente", `El producto ${productoVenta.nombreProducto} no tiene suficiente stock`, "warning");
        return; // Si algún producto no tiene suficiente stock, se detiene el proceso
      }
    }

    try {
      await descontarStock();

      const ventaData = {
        idCliente: cliente ? cliente.idCliente : 0,
        idUsuario: usuario?.idUsuario || 1,
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

      const ventaGenerada = {
        id: response.data.id || new Date().getTime(),
        fecha: new Date().toLocaleString(),
        productos: productosEnVenta,
        total: calcularTotalVenta(),
      };

      setDatosVenta(ventaGenerada);
      setMostrarModalFactura(true);
      setProductosEnVenta([]);
      setTotalVenta(0);
    } catch (error) {
      Swal.fire("Error", "Ocurrió un error al registrar la venta", "error");
    }
  };


  const descontarStock = async () => {
    try {
      for (let productoVenta of productosEnVenta) {
        const nuevoStock = productoVenta.stock - productoVenta.cantidad;
        await API.put(`/productos/${productoVenta.idProducto}`, { stock: nuevoStock });
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el stock", "error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      agregarProducto();
    } else if (e.key === 'F11') {
      e.preventDefault();
      busquedaRapida();
    } else if (e.key === 'F12') {
      e.preventDefault();
      manejarCobro();
    }
  };

  const calcularTotalVenta = () => productosEnVenta.reduce((total, p) => total + p.total, 0);

  const cancelarVenta = () => {
    setProductosEnVenta([]);
    setTotalVenta(0);
    Swal.fire("Venta cancelada", "La venta ha sido cancelada", "info");
  };

  const eliminarProducto = (productoAEliminar) => {
    setProductosEnVenta(productosEnVenta.filter(producto => producto.idProducto !== productoAEliminar.idProducto));
    setTotalVenta(prev => prev - productoAEliminar.total);
    Swal.fire("Eliminado", "Producto eliminado de la venta", "info");
  };

  const busquedaRapida = () => {
    if (!codigoProducto.trim()) {
      Swal.fire("Advertencia", "Por favor ingresa un código de producto", "warning");
      return;
    }

    const productosFiltrados = listaProductos.filter(p =>
      p.idProducto.toString().includes(codigoProducto) ||
      p.nombreProducto.toLowerCase().includes(codigoProducto.toLowerCase())
    );

    if (productosFiltrados.length > 0) {
      setListaProductos(productosFiltrados);
      Swal.fire("Resultados encontrados", `${productosFiltrados.length} productos encontrados`, "success");
    } else {
      Swal.fire("Sin resultados", "No se encontraron productos que coincidan", "info");
    }
  };

  const abrirModal = () => {
    obtenerListaProductos();
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const seleccionarProductoDelModal = (productoSeleccionado) => {
    setProducto(productoSeleccionado);
    setCodigoProducto(productoSeleccionado.idProducto || '');
    setMostrarModal(false);
  };

  const handleSelectCliente = (clienteSeleccionado) => {
    setCliente(clienteSeleccionado);
    setShowClienteModal(false);
    localStorage.setItem("cliente", JSON.stringify(clienteSeleccionado));
    Swal.fire("Cliente seleccionado", `Cliente: ${clienteSeleccionado.nombreCliente}`, "success");
  };

  useEffect(() => {
    if (codigoProducto) buscarProducto();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [codigoProducto]);

  return (
    <div className="ventas-container">
      <header className="ventas-header">
        <img src={Logo} alt="Carrito de compras" />
      </header>

      <section className="ventas-button-row">
        <button className="ventas-button abrir-turno" onClick={abrirTurno}>Abrir Turno</button>
        {Array.from({ length: 11 }, (_, index) => (
          <button key={index} className="ventas-button">Botón</button>
        ))}
        <button className="ventas-button cerrar-turno" onClick={cerrarTurno}>Cerrar Turno</button>
      </section>

      <section className="ventas-product-entry">
        <h2 className="ventas-titulo-gradiente">VENTA DE PRODUCTOS</h2>
        <div className="ventas-controls-line">
          <div className="input-group">
            <label>Código del producto:</label>
            <input
              type="text"
              className="input"
              maxLength="15"
              value={codigoProducto}
              onChange={(e) => setCodigoProducto(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="ventas-add-btn" onClick={abrirModal}><FontAwesomeIcon icon={faSearch} /></button>
            <button className="ventas-add-btn" onClick={agregarProducto}><FontAwesomeIcon icon={faCashRegister} /></button>
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
          <button className="action-btn" onClick={() => setShowClienteModal(true)}>Seleccionar cliente</button>
          <button className="action-btn" onClick={busquedaRapida}>Vender a granel</button>
          <button className="action-btn" onClick={cancelarVenta}>Venta en espera</button>
        </div>
        <div className="ventas-separator" />
      </section>

      <section className="ventas-product-list">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosEnVenta.map((producto, index) => (
              <tr key={index}>
                <td>{producto.idProducto}</td>
                <td>{producto.nombreProducto}</td>
                <td>{producto.cantidad}</td>
                <td>${producto.precioVenta}</td>
                <td>${producto.total}</td>
                <td>
                  <button onClick={() => eliminarProducto(producto)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="ventas-actions">
        <div className="ventas-actions-grid">
          <button className="action-btn">Artículo común</button>
          <button className="action-btn">Datos extra al ticket</button>
          <button className="action-btn">F11 - Búsqueda rápida</button>
          <button className="action-btn" onClick={cancelarVenta}>Cancelar venta</button>
          <button className="action-btn">Editar venta</button>
          <button className="action-btn">Reimprimir último ticket</button>
        </div>
        <div className="ventas-payment-col">
          <button className="ventas-cobrar" onClick={manejarCobro}>F12 - Cobrar</button>
          <div className="ventas-total">Total: ${calcularTotalVenta().toFixed(2)}</div>
        </div>
      </section>

      <footer className="ventas-footer">
        <div className="ventas-footer-content">
          <div>Cajero en turno: {cajero || 'No identificado'}</div>
          <div>{horaActual}</div>
          <div>Cronómetro: {formatearTiempo(segundos)}</div>
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
                      <button onClick={() => seleccionarProductoDelModal(producto)}>Seleccionar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {mostrarModalFactura && (
        <FacturaModal
          show={mostrarModalFactura}
          onHide={() => setMostrarModalFactura(false)}
          datosVenta={datosVenta}
        />
      )}

      <ClienteModal
        show={showClienteModal}
        onHide={() => setShowClienteModal(false)}
        clientes={clientes}
        onSelectCliente={handleSelectCliente}
      />
    </div>
  );
};

export default Ventas;