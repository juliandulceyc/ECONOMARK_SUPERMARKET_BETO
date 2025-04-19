import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Card, Button, Table, Collapse } from 'react-bootstrap';
import { FileDown, ChevronDown, ChevronUp } from 'lucide-react';
import TablePDF from './tablePDF';
import Inventario from '../inventario/inventario';
import * as XLSX from 'xlsx';

const ReportCard = ({ entityKey }) => {
  const [data, setData] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const entity = Inventario[entityKey];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(entity.url);
        setData(res.data);
      } catch (error) {
        console.error(`Error al obtener datos de ${entityKey}`, error);
      }
    };

    fetchData();
  }, [entity.url, entityKey]);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, entity.label);
    XLSX.writeFile(workbook, `${entityKey}.xlsx`);
  };

  if (!entity) return null;

  return (
    <Card className="shadow-lg rounded-4 border-0 mb-4 transition-all">
      <Card.Body className="d-flex flex-column justify-content-between">
        {/* Header con toggle */}
        <div
          className="d-flex align-items-center justify-content-between mb-3"
          onClick={() => setShowOptions(prev => !prev)}
          style={{ cursor: 'pointer' }}
        >
          <div className="d-flex align-items-center gap-3">
            <FileDown size={22} />
            <div>
              <Card.Title className="mb-0">{entity.label}</Card.Title>
              <Card.Text className="text-muted small mb-0">
                Reporte general de {entity.label}
              </Card.Text>
            </div>
          </div>
          {showOptions ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        {/* Contenido colapsable */}
        <Collapse in={showOptions}>
          <div>
            <div className="table-responsive">
              <Table className="table-hover mb-3 text-center align-middle">
                <thead className="table">
                  <tr>
                    {entity.columns.map((col) => (
                      <th key={col.key} className="border-end">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) && data.length > 0 ? (
                    data.slice(0, 3).map((item, i) => (
                      <tr key={i}>
                        {entity.columns.map((col, index) => (
                          <td key={index} className="border-end">
                            {item[col.key] ?? '-'}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={entity.columns.length}>No hay datos</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            <div className="mt-2 d-flex gap-2 justify-content-start">
              <PDFDownloadLink
                document={<TablePDF data={data} columns={entity.columns} />}
                fileName={`${entityKey}.pdf`}
              >
                {({ loading }) => (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {loading ? 'Generando PDF...' : 'Descargar PDF'}
                  </Button>
                )}
              </PDFDownloadLink>

              <Button
                variant="outline-success"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadExcel();
                }}
              >
                Descargar Excel
              </Button>
            </div>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default ReportCard;
