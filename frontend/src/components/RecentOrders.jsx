import { Table, Card } from 'react-bootstrap';

function RecentOrders() {
  const orders = [
    { id: 1, customer: 'John Doe', product: 'iPhone 13', date: '2024-02-20', status: 'Completado', amount: '$999' },
    { id: 2, customer: 'Jane Smith', product: 'MacBook Pro', date: '2024-02-19', status: 'Pendiente', amount: '$1999' },
    { id: 3, customer: 'Bob Johnson', product: 'iPad Air', date: '2024-02-18', status: 'Procesando', amount: '$599' },
    { id: 4, customer: 'Alice Brown', product: 'AirPods Pro', date: '2024-02-17', status: 'Completado', amount: '$249' },
  ];

  return (
    <Card>
      <Card.Header className="bg-white">
        <h5 className="mb-0">Ordenes recientes</h5>
      </Card.Header>
      <Card.Body>
        <Table hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Producto</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`badge bg-${
                    order.status === 'Completado' ? 'success' :
                    order.status === 'Pendiente' ? 'warning' : 'info'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default RecentOrders;