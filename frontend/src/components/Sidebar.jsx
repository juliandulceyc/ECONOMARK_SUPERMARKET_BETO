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
          {userRole === 'admin' && (
            <Nav.Link
              className={`text-white ${currentView === 'users' ? 'active bg-primary' : ''}`}
              onClick={() => onNavigate('users')}
            >
              <i className="bi bi-people me-2"></i>
              Usuarios
            </Nav.Link>
          )}
          {userRole === 'admin' && (
            <Nav.Link
              className={`text-white ${currentView === 'products' ? 'active bg-primary' : ''}`}
              onClick={() => onNavigate('products')}
            >
              <i className="bi bi-people me-2"></i>
              productos
            </Nav.Link>
          )}
          {userRole === 'admin' && (
            <Nav.Link
              className={`text-white ${currentView === 'proveedores' ? 'active bg-primary' : ''}`}
              onClick={() => onNavigate('proveedores')}
            >
              <i className="bi bi-people me-2"></i>
              proveedores
            </Nav.Link>
          )}
          <Nav.Link
            className={`text-white ${currentView === 'sell' ? 'active bg-primary' : ''}`}
            onClick={() => onNavigate('sell')}
          >
            <i className="bi bi-cart me-2"></i>
            Venta
          </Nav.Link>
          {userRole === 'admin' && (
            <Nav.Link
              className={`text-white ${currentView === 'estadisticas' ? 'active bg-primary' : ''}`}
              onClick={() => onNavigate('estadisticas')}
            >
              <i className="bi bi-people me-2"></i>
              estadisticas
            </Nav.Link>
          )}
          {userRole === 'admin' && (
            <Nav.Link
              className={`text-white ${currentView === 'reports' ? 'active bg-primary' : ''}`}
              onClick={() => onNavigate('reports')}
            >
              <i className="bi bi-people me-2"></i>
              reportes
            </Nav.Link>
          )}
          
          {userRole === 'admin' && (
            <Nav.Link
              className={`text-white ${currentView === 'entry' ? 'active bg-primary' : ''}`}
              onClick={() => onNavigate('entry')}
            >
              <i className="bi bi-people me-2"></i>
              entradas/salidas
            </Nav.Link>
          )}
          
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
