import React from 'react';
import ReportsCard from './ReportsCard';

export const Reports = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Reportes Disponibles</h2>
      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <ReportsCard/>
        </div>
      </div>
    </div>
  );
};
