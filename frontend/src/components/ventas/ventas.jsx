import React from 'react';
import './ventas.css';
import Logo from './carrito-de-compras.png';

const Ventas = () => {
  return (
    <div className="ventas-container">
      {/* Encabezado con ícono */}
      <header className="ventas-header">
        <img src={Logo} alt="Carrito de compras" />
      </header>

      {/* Fila de botones debajo del encabezado */}
      <section className="ventas-button-row">
        {Array.from({ length: 13 }, (_, index) => (
          <button className="ventas-button">
            Botón
          </button>
        ))}
      </section>

      {/* Sección de ingreso de datos */}
      <section className="ventas-product-entry">
        <div className='ventas-input'>
          <h5 className='text-ventas-input'>Venta de productos</h5>
          <div className="ventas-input-group">
            <label htmlFor="codigo-producto">Código del producto:</label>
            <input type="text" id="codigo-producto" />
          </div>
        </div>
        <div className="ventas-input-group">
          <label htmlFor="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" />
        </div>
        <div className="ventas-buttons-group">
          <button>Registrar recarga</button>
          <button>Vender a granel</button>
          <button>Venta en espera</button>
        </div>
      </section>

      {/* Sección de la lista de productos */}
      <section className="ventas-product-list">
        <table>
          <thead>
            <tr>
              <th>No. de producto</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Descuento</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí puedes mapear datos dinámicos para generar las filas */}
          </tbody>
        </table>
      </section>

      {/* Sección de acciones y pago */}
      <section className="ventas-actions">
        <div className="ventas-actions-buttons">
          <button>Artículo común</button>
          <button>Datos extra al ticket</button>
          <button>F11 - Búsqueda rápida</button>
          <button>Cancelar venta</button>
          <button>Editar venta</button>
          <button>Reimprimir último ticket</button>
        </div>
        <div className="ventas-payment">
          <button className="ventas-cobrar">F12 - Cobrar</button>
          <div className="ventas-total">$ 0.00</div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="ventas-footer">
        <div>Cajero en turno: Jefferson Andres Contreras</div>
        <div>14:24</div>
      </footer>
    </div>
  );
};

export default Ventas;
