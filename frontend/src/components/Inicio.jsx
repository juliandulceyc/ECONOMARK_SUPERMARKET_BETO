import { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import Inventario from '../components/inventario/inventario';

const iconMap = {
  usuarios: 'bi-person',
  products: 'bi-box-seam',
  categorias: 'bi-tags',
  clientes: 'bi-people',
  ventas: 'bi-cart-check',
  entradas: 'bi-box-arrow-in-down',
  proveedores: 'bi-truck',
  totalVentas: 'bi-graph-up-arrow',
  ganancias: 'bi-currency-dollar',
};

const colorMap = {
  usuarios: 'primary',
  products: 'success',
  categorias: 'warning',
  clientes: 'danger',
  ventas: 'info',
  entradas: 'secondary',
  proveedores: 'dark',
  totalVentas: 'success',
  ganancias: 'warning',
};

const includedKeys = [
  'usuarios',
  'products',
  'categorias',
  'clientes',
  'ventas',
  'entradas',
  'proveedores',
];

function DashboardStats() {
  const [counts, setCounts] = useState({});
  const [totalVentas, setTotalVentas] = useState(0);
  const [ganancias, setGanancias] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const entries = await Promise.all(
        includedKeys.map(async (key) => {
          const url = Inventario[key].url;
          try {
            const res = await fetch(url);
            const data = await res.json();
            return [key, Array.isArray(data) ? data.length : 0];
          } catch (err) {
            console.error(`Error al obtener ${key}:`, err);
            return [key, 0];
          }
        })
      );

      const result = Object.fromEntries(entries);
      setCounts(result);

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
    ...includedKeys.map((key) => ({
      key,
      label: Inventario[key].label,
      value: counts[key],
    })),
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
  ];

  return (
    <Row className="g-3 mb-4">
      {allCards.map(({ key, label, value }) => (
        <Col md={3} key={key}>
          <Card
            className={`text-white bg-${colorMap[key] || 'primary'} shadow-lg rounded-4 border-0 transform-hover`}
            style={{
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
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
                <i
                  className={`bi ${iconMap[key] || 'bi-collection'} h1`}
                  style={{
                    transition: 'transform 0.3s ease, color 0.3s ease',
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                ></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default DashboardStats;
