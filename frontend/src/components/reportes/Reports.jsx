// src/components/reportes/Reports.jsx
import React from 'react';
import ReportCard from './ReportsCard';
import Inventario from '../inventario/inventario';
import './reportes.css'

const Reports = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold">📊 Reportes Disponibles</h2>
      <div className="row g-4">
        {Object.keys(Inventario).map((entityKey) => {
          const entity = Inventario[entityKey];
          return (
            entity && (
              <div key={entityKey} className="col-md-6 col-lg-4">
                <ReportCard entityKey={entityKey} />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Reports;
