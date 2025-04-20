import React from 'react';
import { Modal } from 'react-bootstrap';

const FacturaModal = ({ show, onHide, datosVenta }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Body style={{ fontFamily: 'monospace', padding: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <h5>🧾 COMPROBANTE DE VENTA</h5>
          <p><strong>Venta #{datosVenta.id}</strong></p>
          <p>{datosVenta.fecha}</p>
        </div>
        <hr />
        {datosVenta.productos.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.nombreProducto}</span>
            <span>x{item.cantidad}</span>
            <span>${item.precioVenta * item.cantidad}</span>
          </div>
        ))}
        <hr />
        <div style={{ textAlign: 'right' }}>
          <h6>Total: ${datosVenta.total}</h6>
        </div>
        <hr />
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#999' }}>
          ¡Gracias por su compra! 💜
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FacturaModal;
