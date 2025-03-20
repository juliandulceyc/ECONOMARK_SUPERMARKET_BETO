import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css'; // Importamos el archivo CSS

function Sidebar({ onNavigate, currentView, userRole }) {
  const supermarketImage = 'https://img.icons8.com/?size=100&id=64872&format=png&color=000000';
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-sticky">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {!isCollapsed && (
              <img
                src={supermarketImage}
                alt="Supermarket"
                className="logo-image"
              />
            )}
          </div>
          <button
            className="collapse-button"
            onClick={toggleSidebar}
            title={isCollapsed ? 'Expandir' : 'Minimizar'}
          >
            <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
          </button>
        </div>
        <Nav className="sidebar-nav flex-column">
          <Nav.Link
            className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <div className="nav-item-content">
              <i className="bi bi-speedometer2 me-2"></i>
              {!isCollapsed && <span>Inicio</span>}
            </div>
          </Nav.Link>
          {userRole === 'admin' && (
            <>
              <Nav.Link
                className={`nav-link ${currentView === 'users' ? 'active' : ''}`}
                onClick={() => onNavigate('users')}
              >
                <div className="nav-item-content">
                  <i className="bi bi-people me-2"></i>
                  {!isCollapsed && <span>Usuarios</span>}
                </div>
              </Nav.Link>
              <Nav.Link
                className={`nav-link ${currentView === 'products' ? 'active' : ''}`}
                onClick={() => onNavigate('products')}
              >
                <div className="nav-item-content">
                  <i className="bi bi-box me-2"></i>
                  {!isCollapsed && <span>Productos</span>}
                </div>
              </Nav.Link>
              <Nav.Link
                className={`nav-link ${currentView === 'proveedores' ? 'active' : ''}`}
                onClick={() => onNavigate('proveedores')}
              >
                <div className="nav-item-content">
                  <i className="bi bi-truck me-2"></i>
                  {!isCollapsed && <span>Proveedores</span>}
                </div>
              </Nav.Link>
              <Nav.Link
                className={`nav-link ${currentView === 'estadisticas' ? 'active' : ''}`}
                onClick={() => onNavigate('estadisticas')}
              >
                <div className="nav-item-content">
                  <i className="bi bi-bar-chart me-2"></i>
                  {!isCollapsed && <span>Estadísticas</span>}
                </div>
              </Nav.Link>
              <Nav.Link
                className={`nav-link ${currentView === 'reports' ? 'active' : ''}`}
                onClick={() => onNavigate('reports')}
              >
                <div className="nav-item-content">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  {!isCollapsed && <span>Reportes</span>}
                </div>
              </Nav.Link>
              <Nav.Link
                className={`nav-link ${currentView === 'entry' ? 'active' : ''}`}
                onClick={() => onNavigate('entry')}
              >
                <div className="nav-item-content">
                  <i className="bi bi-arrow-left-right me-2"></i>
                  {!isCollapsed && <span>Entradas/Salidas</span>}
                </div>
              </Nav.Link>
            </>
          )}
          <Nav.Link
            className={`nav-link ${currentView === 'sell' ? 'active' : ''}`}
            onClick={() => onNavigate('sell')}
          >
            <div className="nav-item-content">
              <i className="bi bi-cart me-2"></i>
              {!isCollapsed && <span>Venta</span>}
            </div>
          </Nav.Link>
          <Nav.Link
            className={`nav-link ${currentView === 'settings' ? 'active' : ''}`}
            onClick={() => onNavigate('settings')}
          >
            <div className="nav-item-content">
              <i className="bi bi-gear me-2"></i>
              {!isCollapsed && <span>Ajustes</span>}
            </div>
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;