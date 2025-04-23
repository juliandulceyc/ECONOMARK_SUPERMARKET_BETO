import React from 'react';
import { Card } from 'react-bootstrap';
import {
  BarChart3, CalendarRange, DollarSign, PackageCheck, LineChart
} from 'lucide-react';

const reports = [
  {
    title: 'Ventas por Producto',
    description: 'Gráfico de productos más vendidos',
    icon: <BarChart3 size={32} />,
    bg: 'bg-primary',
    link: '/reportes/ventas-producto'
  },
  {
    title: 'Ventas Mensuales',
    description: 'Resumen de ventas por mes',
    icon: <CalendarRange size={32} />,
    bg: 'bg-success',
    link: '/reportes/ventas-mensuales'
  },
  {
    title: 'Top Productos',
    description: 'Productos más vendidos',
    icon: <PackageCheck size={32} />,
    bg: 'bg-warning text-dark',
    link: '/reportes/top-productos'
  },
  {
    title: 'Ingresos Mensuales',
    description: 'Gráfica de ingresos por mes',
    icon: <DollarSign size={32} />,
    bg: 'bg-danger',
    link: '/reportes/ingresos-mensuales'
  },
  {
    title: 'Comparativa de Categorías',
    description: 'Ventas por categoría',
    icon: <LineChart size={32} />,
    bg: 'bg-info text-dark',
    link: '/reportes/comparativa-categorias'
  }
];

const MenuChart = () => {
  return (
    <div className="row">
      {reports.map((report, index) => (
        <div key={index} className="col-md-6 col-xl-4 mb-4">
          <a href={report.link} style={{ textDecoration: 'none' }}>
            <Card className={`h-100 text-white ${report.bg} shadow-lg border-0`}>
              <Card.Body className="d-flex flex-column align-items-start justify-content-between gap-3 p-4">
                <div className="d-flex align-items-center gap-3">
                  {report.icon}
                  <div>
                    <h5 className="mb-1">{report.title}</h5>
                    <p className="mb-0 small">{report.description}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </a>
        </div>
      ))}
    </div>
  );
};

export default MenuChart;
