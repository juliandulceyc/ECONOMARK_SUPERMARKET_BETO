import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, Spinner } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SalesChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://172.210.65.94:3000/ventas/resumen-productos');
        const data = await response.json();

        // Extraemos nombres de productos y cantidades vendidas
        const labels = data.map(item => item.nombreProducto);
        const cantidades = data.map(item => item.totalCantidad);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Ventas por Producto',
              data: cantidades,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.2,
              fill: true,
            }
          ]
        });

        setLoading(false);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchSalesData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Ventas por Producto'
      }
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header className="bg-white">
        <h5 className="mb-0">Resumen de Ventas</h5>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <Line options={options} data={chartData} />
        )}
      </Card.Body>
    </Card>
  );
}

export default SalesChart;
