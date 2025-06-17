import { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import Inventario from '../inventario/inventario';

const iconMap = {
  totalVentas: 'bi-graph-up-arrow',
  ganancias: 'bi-currency-dollar',
  totalProductos: 'bi-box-seam',
  bajoStock: 'bi-box',
};

const colorMap = {
  totalVentas: 'success',
  ganancias: 'warning',
  totalProductos: 'primary',
  bajoStock: 'danger',
};

function DashboardStats() {
  const [totalVentas, setTotalVentas] = useState(0);
  const [ganancias, setGanancias] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);
  const [bajoStock, setBajoStock] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch productos para total de productos y bajo stock
      try {
        const productosRes = await fetch(Inventario.products.url);
        const productosData = await productosRes.json();
        const total = productosData.length;
        const bajoStockCount = productosData.filter(producto => parseInt(producto.stock) < 10).length;
        setTotalProductos(total);
        setBajoStock(bajoStockCount);
      } catch (err) {
        console.error('Error al obtener productos:', err);
        setTotalProductos(0);
        setBajoStock(0);
      }

      // total y ganancias
      try {
        const ventasRes = await fetch(Inventario.ventas.url);
        const ventasData = await ventasRes.json();
        const total = ventasData.reduce((sum, venta) => sum + (parseFloat(venta.total) || 0), 0);
        setTotalVentas(total);
        setGanancias(total * 0.3);
      } catch (err) {
        console.error('Error al obtener ventas:', err);
        setTotalVentas(0);
        setGanancias(0);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const allCards = [
    {
      key: 'totalVentas',
      label: 'Total Ventas',
      value: `$${totalVentas.toLocaleString()}`,
    },
    {
      key: 'ganancias',
      label: 'Ganancias',
      value: `$${ganancias.toLocaleString()}`,
    },
    {
      key: 'totalProductos',
      label: 'Total Productos',
      value: totalProductos,
    },
    {
      key: 'bajoStock',
      label: 'Bajo Stock',
      value: bajoStock,
    },
  ];

  return (
    <Row className="g-3 mb-4">
      {allCards.map(({ key, label, value }) => (
        <Col md={3} key={key}>
          <Card className={`text-white bg-${colorMap[key] || 'primary'}`}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">{label}</h6>
                  <h3 className="mb-0">
                    {loading && value === undefined ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      value
                    )}
                  </h3>
                </div>
                <i className={`bi ${iconMap[key] || 'bi-collection'} h1`}></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default DashboardStats;
