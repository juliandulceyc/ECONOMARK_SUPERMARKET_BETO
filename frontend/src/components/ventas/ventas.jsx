import React, { useState, useEffect, useCallback } from 'react';
import './ventas.css';
import Logo from '../img/carrito-de-compras.png';
import API from '../services/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCashRegister, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import FacturaModal from './FacturaModal';
import ClienteModal from './ClienteModal';
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';

// Hook personalizado para el cronómetro
function useCronometro() {
  const [activo, setActivo] = useState(false);
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    let intervalo;
    if (activo) {
      intervalo = setInterval(() => setSegundos(s => s + 1), 1000);
    }
    return () => clearInterval(intervalo);
  }, [activo]);

  const iniciar = () => {
    setActivo(true);
    setSegundos(0);
  };

  const detener = () => setActivo(false);

  return { activo, segundos, iniciar, detener, setSegundos };
}

const formatoMoneda = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' });

const Ventas = ({ cajero }) => {
  const [codigoProducto, setCodigoProducto] = useState('');
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [productosEnVenta, setProductosEnVenta] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [listaProductos, setListaProductos] = useState([]);
  const [mostrarModalFactura, setMostrarModalFactura] = useState(false);
  const [datosVenta, setDatosVenta] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [horaActual, setHoraActual] = useState(new Date().toLocaleTimeString());

  // Cronómetro con hook personalizado
  const { activo: cronometroActivo, segundos, iniciar, detener } = useCronometro();

  // Actualiza la hora cada segundo
  useEffect(() => {
    const intervaloReloj = setInterval(() => {
      setHoraActual(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervaloReloj);
  }, []);

  // Carga clientes al montar
  useEffect(() => {
    const clienteGuardado = localStorage.getItem("cliente");
    if (clienteGuardado) setCliente(JSON.parse(clienteGuardado));
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) setUsuario(JSON.parse(usuarioGuardado));

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

  // Buscar producto por código
  const buscarProducto = useCallback(async () => {
    if (!codigoProducto.trim()) {
      setProducto(null);
      return;
    }
    try {
      const response = await API.get(`/productos/${codigoProducto}`);
      setProducto(response.data);
    } catch (error) {
      setProducto(null);
      Swal.fire("Producto no encontrado", "Verifica el código ingresado", "warning");
    }
  }, [codigoProducto]);

  // Obtener lista de productos para el modal
  const obtenerListaProductos = async () => {
    try {
      const response = await API.get('/productos');
      setListaProductos(response.data);
    } catch (error) {
      Swal.fire("Error", "No se pudo obtener la lista de productos", "error");
    }
  };

  // Agregar producto a la venta
  const agregarProducto = useCallback(() => {
    if (!producto) {
      Swal.fire("Advertencia", "Primero debes buscar o seleccionar un producto", "warning");
      return;
    }
    if (producto.stock < cantidad) {
      Swal.fire("Stock insuficiente", `Solo quedan ${producto.stock} unidades de ${producto.nombreProducto}.`, "warning");
      return;
    }
    // Si ya está en la venta, suma la cantidad
    const existente = productosEnVenta.find(p => p.idProducto === producto.idProducto);
    if (existente) {
      const nuevaCantidad = existente.cantidad + cantidad;
      if (nuevaCantidad > producto.stock) {
        Swal.fire("Stock insuficiente", `No puedes agregar más de ${producto.stock} unidades.`, "warning");
        return;
      }
      setProductosEnVenta(productosEnVenta.map(p =>
        p.idProducto === producto.idProducto
          ? { ...p, cantidad: nuevaCantidad, total: nuevaCantidad * p.precioVenta }
          : p
      ));
    } else {
      setProductosEnVenta([
        ...productosEnVenta,
        {
          ...producto,
          cantidad,
          total: producto.precioVenta * cantidad,
        }
      ]);
    }
    setCodigoProducto('');
    setProducto(null);
    setCantidad(1);
    Swal.fire("Agregado", "Producto agregado correctamente", "success");
  }, [producto, cantidad, productosEnVenta]);

  // Calcular total de la venta
  const calcularTotalVenta = useCallback(() =>
    productosEnVenta.reduce((total, p) => total + p.total, 0), [productosEnVenta]);

  // Cobrar venta
  const manejarCobro = async () => {
    if (productosEnVenta.length === 0) {
      Swal.fire("Advertencia", "Agrega productos antes de cobrar", "warning");
      return;
    }
    for (let productoVenta of productosEnVenta) {
      if (productoVenta.stock < productoVenta.cantidad) {
        Swal.fire("Stock insuficiente", `El producto ${productoVenta.nombreProducto} no tiene suficiente stock`, "warning");
        return;
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
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Ocurrió un error al registrar la venta", "error");
    }
  };

  // Descontar stock
  const descontarStock = async () => {
    try {
      for (let productoVenta of productosEnVenta) {
        const nuevoStock = productoVenta.stock - productoVenta.cantidad;
        const nuevoEstado = nuevoStock > 0 ? "disponible" : "agotado";
        await API.put(`/productos/${productoVenta.idProducto}`, { stock: nuevoStock, estado: nuevoEstado });
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el stock", "error");
    }
  };

  // Eliminar producto de la venta
  const eliminarProducto = (productoAEliminar) => {
    setProductosEnVenta(productosEnVenta.filter(producto => producto.idProducto !== productoAEliminar.idProducto));
    Swal.fire("Eliminado", "Producto eliminado de la venta", "info");
  };

  // Cancelar venta
  const cancelarVenta = () => {
    setProductosEnVenta([]);
    Swal.fire("Venta cancelada", "La venta ha sido cancelada", "info");
  };

  // Modal de productos
  const abrirModal = () => {
    obtenerListaProductos();
    setMostrarModal(true);
  };
  const cerrarModal = () => setMostrarModal(false);

  // Seleccionar producto del modal
  const seleccionarProductoDelModal = (productoSeleccionado) => {
    setProducto(productoSeleccionado);
    setCodigoProducto(productoSeleccionado.idProducto || '');
    setMostrarModal(false);
  };

  // Seleccionar cliente
  const handleSelectCliente = (clienteSeleccionado) => {
    setCliente(clienteSeleccionado);
    setShowClienteModal(false);
    localStorage.setItem("cliente", JSON.stringify(clienteSeleccionado));
    Swal.fire("Cliente seleccionado", `Cliente: ${clienteSeleccionado.nombreCliente}`, "success");
  };

  // Búsqueda rápida
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

  // Manejo de teclas global
  useEffect(() => {
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
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [agregarProducto, busquedaRapida, manejarCobro]);

  // Buscar producto cuando cambia el código
  useEffect(() => {
    if (codigoProducto) buscarProducto();
  }, [codigoProducto, buscarProducto]);

  // Formatear tiempo
  const formatearTiempo = (seg) => {
    const h = Math.floor(seg / 3600);
    const m = Math.floor((seg % 3600) / 60);
    const s = seg % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="ventas-container">
      <header className="ventas-header">
        <img src={Logo} alt="Carrito de compras" />
      </header>

      <section className="ventas-button-row">
        <button className="ventas-button abrir-turno" onClick={iniciar}>Abrir Turno</button>
        {Array.from({ length: 11 }, (_, index) => (
          <button key={index} className="ventas-button">Botón</button>
        ))}
        <button className="ventas-button cerrar-turno" onClick={detener}>Cerrar Turno</button>
      </section>

      <section className="ventas-product-entry">
        <h2 className="ventas-titulo-gradiente">VENTA DE PRODUCTOS</h2>
        <div className="ventas-controls-line">
          <div className="input-group">
            <label htmlFor="codigoProducto">Código del producto:</label>
            <input
              id="codigoProducto"
              type="text"
              className="input"
              maxLength="15"
              value={codigoProducto}
              onChange={(e) => setCodigoProducto(e.target.value)}
              aria-label="Código del producto"
            />
            <button className="ventas-add-btn" onClick={abrirModal} aria-label="Buscar producto"><FontAwesomeIcon icon={faSearch} /></button>
            <button className="ventas-add-btn" onClick={agregarProducto} aria-label="Agregar producto"><FontAwesomeIcon icon={faCashRegister} /></button>
          </div>
          <div className="input-group">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              id="cantidad"
              type="number"
              className="input"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              min="1"
              aria-label="Cantidad"
            />
          </div>
          <button className="action-btn" onClick={agregarProducto} disabled={!producto || cantidad < 1}>Agregar a la venta</button>
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
                <td>{formatoMoneda.format(producto.precioVenta)}</td>
                <td>{formatoMoneda.format(producto.total)}</td>
                <td>
                  <button aria-label="Eliminar producto" onClick={() => eliminarProducto(producto)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
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
          <button className="ventas-cobrar" onClick={manejarCobro} disabled={productosEnVenta.length === 0}>F12 - Cobrar</button>
          <div className="ventas-total">Total: {formatoMoneda.format(calcularTotalVenta())}</div>
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
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h3>Seleccionar producto</h3>
            <button className="modal-close" onClick={cerrarModal} aria-label="Cerrar modal">✖</button>
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