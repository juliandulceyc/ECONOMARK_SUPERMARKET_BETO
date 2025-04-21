import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'; // Si usas Bootstrap para los modales

const ClienteModal = ({ showModal, handleClose, clientes, handleSelectCliente }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar los clientes por el término de búsqueda, asegurándote de que el cliente tenga la propiedad nombreCliente
  const filteredClientes = clientes.filter(cliente =>
    cliente.nombreCliente && cliente.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona un Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          placeholder="Buscar cliente..."
          className="ventas-input-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="modal-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.length > 0 ? (
              filteredClientes.map(cliente => (
                <tr key={cliente.idCliente} onClick={() => handleSelectCliente(cliente)}>
                  <td>{cliente.nombreCliente}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No se encontraron clientes.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default ClienteModal;
