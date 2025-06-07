import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Table } from 'react-bootstrap';
import { ArrowDownCircle, ArrowUpCircle, Box } from 'react-bootstrap-icons'; // Iconos

const EntradasSalidasMenu = () => {
  const [showEntradasForm, setShowEntradasForm] = useState(false);
  const [showSalidasForm, setShowSalidasForm] = useState(false);

  // Estado para las entradas y salidas
  const [entradaData, setEntradaData] = useState({ producto: '', cantidad: '', proveedor: '', fecha: '' });
  const [salidaData, setSalidaData] = useState({ producto: '', cantidad: '', cliente: '', fecha: '' });

  // Manejadores de cambio para las entradas y salidas
  const handleEntradaChange = (e) => {
    const { name, value } = e.target;
    setEntradaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalidaChange = (e) => {
    const { name, value } = e.target;
    setSalidaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEntrada = (e) => {
    e.preventDefault();
    console.log('Entrada guardada:', entradaData);
    alert('Entrada registrada correctamente');
    setShowEntradasForm(false); 
  };

  const handleSaveSalida = (e) => {
    e.preventDefault();
    console.log('Salida guardada:', salidaData);
    alert('Salida registrada correctamente');
    setShowSalidasForm(false);
  };

  return (
    <div className="entradas-salidas-menu">
      <h2 className="text-center my-4">Gestión de Entradas y Salidas</h2>
      
      <div className="d-flex justify-content-between">
        {/* Botones para Entradas y Salidas */}
        <Button 
          variant="success" 
          onClick={() => setShowEntradasForm(!showEntradasForm)}
          style={{ width: '200px' }}
        >
          <ArrowDownCircle style={{ marginRight: '10px' }} />
          Registrar Entrada
        </Button>

        <Button 
          variant="danger" 
          onClick={() => setShowSalidasForm(!showSalidasForm)}
          style={{ width: '200px' }}
        >
          <ArrowUpCircle style={{ marginRight: '10px' }} />
          Registrar Salida
        </Button>
      </div>

      {/* Formulario de Entradas */}
      {showEntradasForm && (
        <Card className="mt-4 shadow-sm">
          <Card.Header className="bg-success text-white">Registrar Entrada de Producto</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSaveEntrada}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Producto</Form.Label>
                    <Form.Control
                      type="text"
                      name="producto"
                      value={entradaData.producto}
                      onChange={handleEntradaChange}
                      placeholder="Nombre del producto"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      name="cantidad"
                      value={entradaData.cantidad}
                      onChange={handleEntradaChange}
                      placeholder="Cantidad"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Proveedor</Form.Label>
                    <Form.Control
                      type="text"
                      name="proveedor"
                      value={entradaData.proveedor}
                      onChange={handleEntradaChange}
                      placeholder="Proveedor"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                      type="date"
                      name="fecha"
                      value={entradaData.fecha}
                      onChange={handleEntradaChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="success" type="submit">
                Guardar Entrada
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Formulario de Salidas */}
      {showSalidasForm && (
        <Card className="mt-4 shadow-sm">
          <Card.Header className="bg-danger text-white">Registrar Salida de Producto</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSaveSalida}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Producto</Form.Label>
                    <Form.Control
                      type="text"
                      name="producto"
                      value={salidaData.producto}
                      onChange={handleSalidaChange}
                      placeholder="Nombre del producto"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      name="cantidad"
                      value={salidaData.cantidad}
                      onChange={handleSalidaChange}
                      placeholder="Cantidad"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control
                      type="text"
                      name="cliente"
                      value={salidaData.cliente}
                      onChange={handleSalidaChange}
                      placeholder="Cliente"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                      type="date"
                      name="fecha"
                      value={salidaData.fecha}
                      onChange={handleSalidaChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="danger" type="submit">
                Guardar Salida
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Tabla de Entradas y Salidas recientes */}
      <Card className="mt-4 shadow-sm">
        <Card.Header className="bg-light">Historial de Entradas y Salidas</Card.Header>
        <Card.Body>
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Fecha</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {/* Aquí irían los datos de entradas y salidas */}
              <tr>
                <td>Producto A</td>
                <td>50</td>
                <td>2025-04-23</td>
                <td>Entrada</td>
              </tr>
              <tr>
                <td>Producto B</td>
                <td>20</td>
                <td>2025-04-22</td>
                <td>Salida</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EntradasSalidasMenu;
