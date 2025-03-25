import React from 'react';
import { InputGroup, Form, Button, Row, Col } from 'react-bootstrap';
import { FaSearch, FaFilter } from 'react-icons/fa';

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  filterBy, 
  onFilterChange, 
  categories = [] 
}) => {
  return (
    <Row className="mb-4 g-3">
      <Col md={8}>
        <InputGroup>
          <Form.Control
            placeholder="Buscar por categoria..."
            aria-label="Search products"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Button variant="primary" disabled>
            <FaSearch /> Buscar
          </Button>
        </InputGroup>
      </Col>
      <Col md={4}>
        <InputGroup>
          <Form.Select
            value={filterBy}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Form.Select>
          <Button variant="outline-secondary" disabled>
            <FaFilter />
          </Button>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default SearchBar;