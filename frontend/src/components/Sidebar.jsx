import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';

function Sidebar({ onNavigate, currentView, userRole }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`bg-dark text-white h-100 sidebar ${isCollapsed ? 'collapsed' : ''}`}
      style={{ width: isCollapsed ? '60px' : '250px', transition: 'width 0.3s ease' }}
    >
      <div className="sidebar-sticky">
        <div className="py-4 px-3 d-flex justify-content-between align-items-center">
          {!isCollapsed && <h5>Panel de Administración</h5>}
          <button
            className="btn btn-sm btn-light"
            onClick={toggleSidebar}
            title={isCollapsed ? 'Expandir' : 'Minimizar'}
          >
            <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
          </button>
        </div>
        <Nav className="flex-column">
          <Nav.Link
            className={`text-white ${currentView === 'dashboard' ? 'active bg-primary' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <i className="bi bi-speedometer2 me-2"></i>
            {!isCollapsed && <span>Dashboard</span>}
          </Nav.Link>
          {userRole === 'admin' && (
            <>
              <Nav.Link
                className={`text-white ${currentView === 'users' ? 'active bg-primary' : ''}`}
                onClick={() => onNavigate('users')}
              >
                <i className="bi bi-people me-2"></i>
                {!isCollapsed && <span>Usuarios</span>}
              </Nav.Link>
              <Nav.Link
                className={`text-white ${currentView === 'products' ? 'active bg-primary' : ''}`}
                onClick={() => onNavigate('products')}
              >
                <i className="bi bi-box me-2"></i>
                {!isCollapsed && <span>Productos</span>}
              </Nav.Link>
              <Nav.Link
                className={`text-white ${currentView === 'proveedores' ? 'active bg-primary' : ''}`}
                onClick={() => onNavigate('proveedores')}
              >
                <i className="bi bi-truck me-2"></i>
                {!isCollapsed && <span>Proveedores</span>}
              </Nav.Link>
              <Nav.Link
                className={`text-white ${currentView === 'estadisticas' ? 'active bg-primary' : ''}`}
                onClick={() => onNavigate('estadisticas')}
              >
                <i className="bi bi-bar-chart me-2"></i>
                {!isCollapsed && <span>Estadísticas</span>}
              </Nav.Link>
              <Nav.Link
                className={`text-white ${currentView === 'reports' ? 'active bg-primary' : ''}`}
                onClick={() => onNavigate('reports')}
              >
                <i className="bi bi-file-earmark-text me-2"></i>
                {!isCollapsed && <span>Reportes</span>}
              </Nav.Link>
              <Nav.Link
                className={`text-white ${currentView === 'entry' ? 'active bg-primary' : ''}`}
                onClick={() => onNavigate('entry')}
              >
                <i className="bi bi-arrow-left-right me-2"></i>
                {!isCollapsed && <span>Entradas/Salidas</span>}
              </Nav.Link>
            </>
          )}
          <Nav.Link
            className={`text-white ${currentView === 'sell' ? 'active bg-primary' : ''}`}
            onClick={() => onNavigate('sell')}
          >
            <i className="bi bi-cart me-2"></i>
            {!isCollapsed && <span>Venta</span>}
          </Nav.Link>
          <Nav.Link
            className={`text-white ${currentView === 'settings' ? 'active bg-primary' : ''}`}
            onClick={() => onNavigate('settings')}
          >
            <i className="bi bi-gear me-2"></i>
            {!isCollapsed && <span>Ajustes</span>}
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;