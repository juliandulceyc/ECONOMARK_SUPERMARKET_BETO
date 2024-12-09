import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileDown } from 'lucide-react';
import { Card, Button, Table } from 'react-bootstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TablePDF from '../tablePDF.jsX';

const URL = 'http://localhost:3000/tablas/';
const URLCAT = 'http://localhost:3000/categorias/';

const ReportsCard = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(URL);
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos', error);
      }
    };

    const getCategories = async () => {
      try {
        const response = await axios.get(URLCAT);
        setCategories(response.data);
      } catch (error) {
        console.error('Error al obtener categorías', error);
      }
    };

    getProducts();
    getCategories();
  }, []);

  const handleDownload = (format) => {
    // Aquí iría la lógica real de descarga
    alert(`Descargando en formato ${format}`);
  };

  return (
    <div
      className="card h-100 shadow-sm cursor-pointer"
      onClick={() => setShowOptions(!showOptions)}
    >
      <div className="card-body">
        <h5 className="card-title d-flex align-items-center">
          <FileDown className="me-2" size={20} />
          Productos
        </h5>
        <p className="card-text text-muted">Estado actual del inventario</p>
        <Table className="table table-hover mb-0">
          <thead>
            <tr className="table-header-gradient text-white bg-primary">
              <th className="text-center py-3 border-end">ID</th>
              <th className="text-center py-3 border-end">ARTICULO</th>
              <th className="text-center py-3 border-end">CATEGORIA</th>
              <th className="text-center py-3 border-end">PRECIO</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 4).map((product) => (
              <tr key={product.id}>
                <td className="text-center align-middle border-end">{product.id}</td>
                <td className="text-center align-middle border-end">{product.nombre}</td>
                <td className="text-center align-middle border-end">{product.categoria}</td>
                <td className="text-center align-middle border-end">{product.precio}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {showOptions && (
          <div className="mt-3">
            <p className="mb-2 text-muted small">Formatos disponibles:</p>
            <div className="d-flex gap-2">
              {['PDF', 'Excel'].map((format) => (
                <React.Fragment key={format}>
                  {format === 'PDF' ? (
                    <PDFDownloadLink
                      document={<TablePDF products={products} categories={categories} />}
                      fileName="reporte.pdf"
                    >
                      {({ loading }) =>
                        loading ? (
                          <Button
                            className="btn btn-sm btn-outline-primary"
                            style={{ backgroundColor: '#0056b3', borderColor: '#0056b3', color: '#fff' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Generando PDF...
                          </Button>
                        ) : (
                          <Button
                            className="btn btn-sm btn-outline-primary"
                            style={{ backgroundColor: '#0056b3', borderColor: '#0056b3', color: '#fff' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                             PDF
                          </Button>
                        )
                      }
                    </PDFDownloadLink>
                  ) : (
                    <Button
                      className="btn btn-sm btn-outline-primary"
                      style={{ backgroundColor: '#007bff', borderColor: '#007bff', color: '#fff' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(format);
                      }}
                    >
                      Descargar {format}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsCard;
