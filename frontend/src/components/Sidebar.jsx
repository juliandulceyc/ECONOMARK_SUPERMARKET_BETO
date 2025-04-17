import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ onNavigate, currentView, userRole }) {
  const supermarketImage = 'https://img.icons8.com/?size=100&id=otDBSWUrE50n&format=png&color=000000';
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
                alt="Supermarket logo"
                className="logo-image"
              />
            )}
          </div>
          <button
            className="collapse-button"
            onClick={toggleSidebar}
            title={isCollapsed ? 'Expandir' : 'Minimizar'}
          >
            <i className={`icon ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          <div
            role="button"
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <div className="nav-content">
              <i className="bi bi-speedometer2"></i>
              {!isCollapsed && <span>Inicio</span>}
            </div>
          </div>
          
          {userRole === 'admin' && (
            <>
              <div
                role="button"
                className={`nav-item ${currentView === 'users' ? 'active' : ''}`}
                onClick={() => onNavigate('users')}
              >
                <div className="nav-content">
                  <i className="bi bi-people"></i>
                  {!isCollapsed && <span>Usuarios</span>}
                </div>
              </div>
              <div
                role="button"
                className={`nav-item ${currentView === 'products' ? 'active' : ''}`}
                onClick={() => onNavigate('products')}
              >
                <div className="nav-content">
                  <i className="bi bi-box"></i>
                  {!isCollapsed && <span>Inventario</span>}
                </div>
              </div>
              <div
                role="button"
                className={`nav-item ${currentView === 'proveedores' ? 'active' : ''}`}
                onClick={() => onNavigate('proveedores')}
              >
                <div className="nav-content">
                  <i className="bi bi-truck"></i>
                  {!isCollapsed && <span>Proveedores</span>}
                </div>
              </div>
              <div
                role="button"
                className={`nav-item ${currentView === 'estadisticas' ? 'active' : ''}`}
                onClick={() => onNavigate('estadisticas')}
              >
                <div className="nav-content">
                  <i className="bi bi-bar-chart"></i>
                  {!isCollapsed && <span>Estadísticas</span>}
                </div>
              </div>
              <div
                role="button"
                className={`nav-item ${currentView === 'reports' ? 'active' : ''}`}
                onClick={() => onNavigate('reports')}
              >
                <div className="nav-content">
                  <i className="bi bi-file-earmark-text"></i>
                  {!isCollapsed && <span>Reportes</span>}
                </div>
              </div>
              <div
                role="button"
                className={`nav-item ${currentView === 'entry' ? 'active' : ''}`}
                onClick={() => onNavigate('entry')}
              >
                <div className="nav-content">
                  <i className="bi bi-arrow-left-right"></i>
                  {!isCollapsed && <span>Entradas/Salidas</span>}
                </div>
              </div>
            </>
          )}
          
          <div
            role="button"
            className={`nav-item ${currentView === 'sell' ? 'active' : ''}`}
            onClick={() => onNavigate('sell')}
          >
            <div className="nav-content">
              <i className="bi bi-cart"></i>
              {!isCollapsed && <span>Ventas</span>}
            </div>
          </div>
          <div
            role="button"
            className={`nav-item ${currentView === 'settings' ? 'active' : ''}`}
            onClick={() => onNavigate('settings')}
          >
            <div className="nav-content">
              <i className="bi bi-gear"></i>
              {!isCollapsed && <span>Ajustes</span>}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;