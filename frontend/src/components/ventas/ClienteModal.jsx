import React, { useState } from 'react';
import { Modal, Table, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ClienteModal = ({ show, onHide, clientes, onSelectCliente }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCliente, setSelectedCliente] = useState(null);

  // Filtrar clientes por término de búsqueda
  const filteredClientes = clientes.filter(cliente => 
    cliente.nombreCliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.identificacion?.includes(searchTerm) ||
    cliente.telefono?.includes(searchTerm)
  );

  const handleSelect = () => {
    if (!selectedCliente) {
      Swal.fire("Advertencia", "Por favor selecciona un cliente", "warning");
      return;
    }
    onSelectCliente(selectedCliente);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Seleccionar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <Form.Control
            type="text"
            placeholder="Buscar cliente por nombre, identificación o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Identificación</th>
                <th>Teléfono</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.length > 0 ? (
                filteredClientes.map((cliente, index) => (
                  <tr 
                    key={cliente.idCliente} 
                    onClick={() => setSelectedCliente(cliente)}
                    className={`cursor-pointer ${selectedCliente?.idCliente === cliente.idCliente ? 'table-active' : ''}`}
                  >
                    <td>{index + 1}</td>
                    <td>{cliente.nombreCliente}</td>
                    <td>{cliente.identificacion}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No se encontraron clientes
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button 
          className="btn btn-secondary" 
          onClick={onHide}
        >
          Cancelar
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleSelect}
          disabled={!selectedCliente}
        >
          Seleccionar Cliente
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClienteModal;