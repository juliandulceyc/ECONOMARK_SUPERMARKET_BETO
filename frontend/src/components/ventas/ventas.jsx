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

      {/* Fila superior de botones */}
      <section className="ventas-button-row">
        {Array.from({ length: 13 }, (_, index) => (
          <button key={index} className="ventas-button">
            Botón
          </button>
        ))}
      </section>

      {/* Sección de ingreso de datos */}
      <section className="ventas-product-entry">
        <div className="ventas-titulo-container">
          <h2 className="ventas-titulo-gradiente">VENTA DE PRODUCTOS</h2>
        </div>
        <div className="ventas-controls-line">
          <div className="input-group">
            <label>Código del producto:</label>
            <input type="text" className="input" maxLength="15" />
            <button className="ventas-add-btn">+</button>
          </div>
          <div className="input-group">
            <label>Cantidad:</label>
            <input type="number" className="input" />
          </div>

          <button className="action-btn">Registrar recarga</button>
          <button className="action-btn">Vender a granel</button>
          <button className="action-btn">Venta en espera</button>
        </div>
        <div className='ventas-separator' />
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
            {/* Filas de ejemplo (ajustar el número) */}
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item}>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            ))}
          </tbody>
          <tbody>
            {/* Aquí se pueden mapear datos dinámicos */}
          </tbody>
        </table>
      </section>

      <section className="ventas-actions">
        {/* Columna izquierda: botones */}
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

        {/* Columna derecha: botón cobrar y, debajo, total */}
        <div className="ventas-payment-col">
          <button className="ventas-cobrar">F12 - Cobrar</button>
          <div className="ventas-total">$ 0.00</div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="ventas-footer">
        <div className="ventas-footer-content">
          <div>Cajero en turno: Jefferson Andres Contreras</div>
          <div>14:24</div>
        </div>
      </footer>
    </div>
  );
};

export default Ventas;
