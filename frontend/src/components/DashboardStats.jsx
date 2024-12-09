import { Row, Col, Card } from 'react-bootstrap';

function DashboardStats() {
  return (
    <Row className="g-3 mb-4">
      <Col md={3}>
        <Card className="text-white bg-primary">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-0">Total Ventas</h6>
                <h3 className="mb-0">$24,500</h3>
              </div>
              <i className="bi bi-cart-check h1"></i>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-white bg-success">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-0">Total Productos</h6>
                <h3 className="mb-0">1,250</h3>
              </div>
              <i className="bi bi-people h1"></i>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-white bg-warning">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-0">Nuevas Ordenes</h6>
                <h3 className="mb-0">150</h3>
              </div>
              <i className="bi bi-bag-check h1"></i>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-white bg-danger">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-0">Ganancias</h6>
                <h3 className="mb-0">$8,450</h3>
              </div>
              <i className="bi bi-currency-dollar h1"></i>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default DashboardStats;