import React from 'react';
import { InputGroup, Form, Button, Row, Col } from 'react-bootstrap';
import { FaSearch, FaFilter } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <Row className="mb-4 g-3">
      <Col md={8}>
        <InputGroup>
          <Form.Control
            placeholder="Busqueda"
            aria-label="Search users"
          />
          <Button variant="primary">
            <FaSearch /> Buscar
          </Button>
        </InputGroup>
      </Col>
      <Col md={4}>
        <InputGroup>
          <Form.Select>
            <option>Filtrar por</option>
            <option>Activo</option>
            <option>Pendiente</option>
            <option>Inactivo</option>
          </Form.Select>
          <Button variant="outline-secondary w-80">
            <FaFilter /> Filtro
          </Button>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default SearchBar;