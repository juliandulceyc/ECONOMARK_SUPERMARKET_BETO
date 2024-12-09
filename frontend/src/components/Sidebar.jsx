import React from 'react';
import { Nav } from 'react-bootstrap';

function Sidebar({ onNavigate, currentView, userRole }) {
  return (
    <div className="bg-dark text-white h-100 sidebar">
      <div className="sidebar-sticky">
        <div className="py-4 px-3">
          <h5>Panel de Administración</h5>
        </div>
        <Nav className="flex-column">
          <Nav.Link
            className={`text-white ${currentView === 'dashboard' ? 'active bg-primary' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </Nav.Link>
          <Nav.Link
            className={`text-white ${currentView === 'users' ? 'active bg-primary' : ''}`}
            onClick={() => {
              if (userRole === 'admin') {
                onNavigate('users');
              } else {
                alert('No tienes permisos para acceder a esta sección.');
              }
            }}
            style={{ pointerEvents: userRole === 'admin' ? 'auto' : 'none', opacity: userRole === 'admin' ? 1 : 0.6 }}
          >
            <i className="bi bi-people me-2"></i>
            Usuarios
          </Nav.Link>
          <Nav.Link
            className={`text-white ${currentView === 'products' ? 'active bg-primary' : ''}`}
            onClick={() => onNavigate('products')}
          >
            <i className="bi bi-cart me-2"></i>
            Productos
          </Nav.Link>
          <Nav.Link
            className={`text-white ${currentView === 'analytics' ? 'active bg-primary' : ''}`}
            onClick={() => onNavigate('analytics')}
          >
            <i className="bi bi-graph-up me-2"></i>
            Análisis
          </Nav.Link>
          <Nav.Link
            className={`text-white ${currentView === 'reports' ? 'active bg-primary' : ''}`}
            onClick={() => onNavigate('reports')}
          >
            <i className="bi bi-file-earmark-bar-graph me-2"></i>
            Reportes
          </Nav.Link>
          <Nav.Link
            className={`text-white ${currentView === 'settings' ? 'active bg-primary' : ''}`}
            onClick={() => onNavigate('settings')}
          >
            <i className="bi bi-gear me-2"></i>
            Ajustes
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
