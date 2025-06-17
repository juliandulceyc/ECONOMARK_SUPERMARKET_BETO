import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

function Sidebar({ onNavigate, currentView, userRole }) {
  const supermarketImage = 'https://img.icons8.com/?size=100&id=otDBSWUrE50n&format=png&color=000000';
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { key: 'dashboard', icon: 'bi-speedometer2', label: 'Inicio', roles: ['admin', 'user'] },
    { key: 'users', icon: 'bi-people', label: 'Usuarios', roles: ['admin'] },
    { key: 'inventory', icon: 'bi-box', label: 'Inventario', roles: ['admin'] },
    { key: 'proveedores', icon: 'bi-truck', label: 'Proveedores', roles: ['admin'] },
    { key: 'estadisticas', icon: 'bi-bar-chart', label: 'Estadísticas', roles: ['admin'] },
    { key: 'reports', icon: 'bi-file-earmark-text', label: 'Reportes', roles: ['admin'] },
    { key: 'entry', icon: 'bi-arrow-left-right', label: 'Entradas/Salidas', roles: ['admin'] },
    { key: 'sell', icon: 'bi-cart', label: 'Ventas', roles: ['admin', 'user'] },
    { key: 'settings', icon: 'bi-gear', label: 'Ajustes', roles: ['admin', 'user'] },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-sticky">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img
              src={supermarketImage}
              alt="Supermarket logo"
              className={`logo-image ${isCollapsed ? 'collapsed' : ''}`}
            />
          </div>
          <button
            className="collapse-button"
            onClick={toggleSidebar}
            title={isCollapsed ? 'Expandir' : 'Minimizar'}
          >
            <i className={`fas ${isCollapsed ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems
            .filter(item => item.roles.includes(userRole))
            .map(item => (
              <button
                key={item.key}
                type="button"
                className={`nav-item ${currentView === item.key ? 'active' : ''}`}
                onClick={() => onNavigate(item.key)}
                style={{
                  background: 'none',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  padding: 0,
                  margin: 0,
                  cursor: 'pointer'
                }}
                aria-current={currentView === item.key ? "page" : undefined}
              >
                <div className="nav-content">
                  <i className={`bi ${item.icon}`}></i>
                  <span className={`nav-text ${isCollapsed ? 'hidden' : ''}`}>{item.label}</span>
                </div>
              </button>
            ))}
        </nav>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default Sidebar;