import React, { useState, useEffect } from 'react';
import './ventas.css';
import Logo from './carrito-de-compras.png';
import API from './services/axiosConfig'; // Configuración de la API
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCashRegister } from '@fortawesome/free-solid-svg-icons'; // Iconos para búsqueda y facturación
import FacturaModal from './FacturaModal'; // Modal de factura

const Ventas = () => {
  const [codigoProducto, setCodigoProducto] = useState('');
  const [producto, setProducto] = useState(null); // Producto encontrado
  const [cantidad, setCantidad] = useState(1); // Cantidad del producto
  const [productosEnVenta, setProductosEnVenta] = useState([]); // Lista de productos en venta
  const [mostrarModal, setMostrarModal] = useState(false); // Control de visibilidad del modal
  const [listaProductos, setListaProductos] = useState([]); // Lista de productos para el modal
  const [totalVenta, setTotalVenta] = useState(0); // Total de la venta
  const [mostrarModalFactura, setMostrarModalFactura] = useState(false); // Control de visibilidad del modal de factura
  const [datosVenta, setDatosVenta] = useState(null); // Datos de la venta para mostrar en el modal de factura

  // Función para buscar un producto por su código
  const buscarProducto = async () => {
    try {
      const response = await API.get(`/productos/${codigoProducto}`);
      setProducto(response.data);
    } catch (error) {
      console.error("Error al buscar el producto:", error);
      setProducto(null); // Si no se encuentra el producto, lo ponemos en null
    }
  };

  // Función para obtener la lista de productos para el modal
  const obtenerListaProductos = async () => {
    try {
      const response = await API.get('/productos');
      setListaProductos(response.data); // Asignamos los productos obtenidos
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  // Función para agregar un producto a la venta
  const agregarProducto = () => {
    if (producto) {
      const productoConCantidad = {
        ...producto,
        cantidad,
        total: producto.precioVenta * cantidad, // Calcular total del producto
      };
      setProductosEnVenta([...productosEnVenta, productoConCantidad]);

      // Actualizar el total de la venta
      setTotalVenta(totalVenta + productoConCantidad.total);

      setCodigoProducto('');
      setProducto(null);
      setCantidad(1);
    }
  };

  // Función para calcular el total de la venta (actualizado con cada producto agregado)
  const calcularTotalVenta = () => {
    return productosEnVenta.reduce((total, producto) => total + producto.total, 0);
  };

  // Función que abre el modal y obtiene los productos
  const abrirModal = () => {
    obtenerListaProductos(); // Obtener productos del backend
    setMostrarModal(true); // Abrir el modal
  };

  // Función para seleccionar un producto del modal
  const seleccionarProductoDelModal = (productoSeleccionado) => {
    setProducto(productoSeleccionado); // Establecer el producto seleccionado
    setCodigoProducto(productoSeleccionado.idProducto || ''); // Asignar el código del producto
    setMostrarModal(false); // Cerrar el modal
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setMostrarModal(false); // Cerrar el modal
  };

  // Función para generar la factura
  const generarFactura = () => {
    setDatosVenta({
      id: new Date().getTime(),
      fecha: new Date().toLocaleString(),
      productos: productosEnVenta,
      total: totalVenta,
    });
    setMostrarModalFactura(true);
  };

  // Función para descontar el stock de los productos vendidos
  const descontarStock = async () => {
    try {
      // Descontar el stock de cada producto vendido
      for (let productoVenta of productosEnVenta) {
        const nuevoStock = productoVenta.stock - productoVenta.cantidad; // Nuevo stock tras la venta

        // Actualizar el stock del producto en la base de datos
        await API.put(`/productos/${productoVenta.idProducto}`, {
          stock: nuevoStock
        });
      }

      // Aquí podemos añadir un mensaje de éxito o lo que sea necesario.
      alert("Productos descontados correctamente.");
    } catch (error) {
      console.error("Error al descontar el stock:", error);
      alert("Error al descontar el stock.");
    }
  };

  const manejarCobro = async () => {
    try {
      // Descontamos el stock de los productos
      await descontarStock();

      // 1. Armamos los datos de la venta
      const ventaData = {
        idCliente: 1, // Usa un ID válido o agrega selector de cliente más adelante
        idUsuario: 1, // Usa el ID del usuario logueado
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

      // 2. Registramos la venta en el backend
      const response = await API.post('/ventas', ventaData);
      console.log(response.data.message);

      // 3. Mostramos la factura
      generarFactura();

      // 4. Limpiamos los datos de la venta
      setProductosEnVenta([]);
      setTotalVenta(0);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      alert("Ocurrió un error al registrar la venta.");
    }
  };

  useEffect(() => {
    if (codigoProducto) {
      buscarProducto(); // Si hay un código de producto, lo buscamos automáticamente
    }
  }, [codigoProducto]);

  return (
    <div className="ventas-container">
      <header className="ventas-header">
        <img src={Logo} alt="Carrito de compras" />
      </header>

      {/* Fila de botones */}
      <section className="ventas-button-row">
        {Array.from({ length: 13 }, (_, index) => (
          <button key={index} className="ventas-button">
            Botón
          </button>
        ))}
      </section>

      {/* Ingreso de datos de venta */}
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
            {/* Botón para buscar producto */}
            <button className="ventas-add-btn" onClick={abrirModal}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            {/* Botón para iniciar facturación */}
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
              onChange={(e) => setCantidad(e.target.value)}
              min="1"
            />
          </div>

          {/* Botón para agregar a la venta */}
          <button className="action-btn" onClick={agregarProducto}>Agregar a la venta</button>
          <button className="action-btn">Registrar recarga</button>
          <button className="action-btn">Vender a granel</button>
          <button className="action-btn">Venta en espera</button>
        </div>
        <div className='ventas-separator' />
      </section>

      {/* Lista de productos en venta */}
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

      {/* Acciones de venta */}
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
          <div className="ventas-total">Total: ${calcularTotalVenta()}</div>
        </div>
      </section>

      <footer className="ventas-footer">
        <div className="ventas-footer-content">
          <div>Cajero en turno: Jefferson Andres Contreras</div>
          <div>14:24</div>
        </div>
      </footer>

      {/* Modal de productos */}
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

      {/* Modal de Factura */}
      {mostrarModalFactura && (
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
