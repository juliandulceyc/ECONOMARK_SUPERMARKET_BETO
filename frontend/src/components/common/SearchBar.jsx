import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Form, Row, Col } from 'react-bootstrap';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({
  searchQuery,
  onSearchChange,
  filterByColumn,
  onFilterColumnChange,
  filterByValue,
  onFilterValueChange,
  columns = []
}) => {
  return (
    <div className="custom-search-bar mb-4 p-4 shadow-sm">
      <Row className="gy-3 align-items-end">
        {/* Búsqueda general */}
        <Col md={6}>
          <Form.Label className="custom-label">🔎 Búsqueda general</Form.Label>
          <InputGroup className="input-glow">
            <InputGroup.Text className="input-icon">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </InputGroup>
        </Col>

        {/* Selección de columna */}
        <Col md={3}>
          <Form.Label className="custom-label">📁 Columna</Form.Label>
          <Form.Select
            className="input-glow"
            value={filterByColumn}
            onChange={(e) => onFilterColumnChange(e.target.value)}
          >
            <option value="">Todas</option>
            {columns.map(col => (
              <option key={col.key} value={col.key}>{col.label}</option>
            ))}
          </Form.Select>
        </Col>

        {/* Valor del filtro */}
        <Col md={3}>
          <Form.Label className="custom-label">🎯 Valor</Form.Label>
          <InputGroup className="input-glow">
            <InputGroup.Text className="input-icon">
              <FaFilter />
            </InputGroup.Text>
            <Form.Control
              placeholder="Filtrar por..."
              value={filterByValue}
              onChange={(e) => onFilterValueChange(e.target.value)}
              disabled={!filterByColumn}
            />
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  filterByColumn: PropTypes.string.isRequired,
  onFilterColumnChange: PropTypes.func.isRequired,
  filterByValue: PropTypes.string.isRequired,
  onFilterValueChange: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  )
};

export default SearchBar;
