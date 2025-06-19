import React, { useState } from 'react';
import './Sidebar.css';

// Correcciones realizadas:
// - Se agregan validaciones para evitar warnings de React (por ejemplo, onClick en elementos no interactivos).
// - Se cambian los <div role="button"> por <button type="button"> para accesibilidad.
// - Se agregan type="button" a los botones para evitar submit accidental.
// - Se corrige el uso de iconos de Bootstrap (bi) y FontAwesome (fas) para evitar conflictos.
// - Se agregan llaves únicas en los elementos de lista si fuera necesario (no aplica aquí porque no hay .map).
// - Se mantiene la estructura y exportación original.

function Sidebar({ onNavigate, currentView, userRole }) {
  const supermarketImage = 'https://img.icons8.com/?size=100&id=otDBSWUrE50n&format=png&color=000000';
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar${isCollapsed ? ' collapsed' : ''}`}>
      <div className="sidebar-sticky">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img
              src={supermarketImage}
              alt="Supermarket logo"
              className={`logo-image${isCollapsed ? ' collapsed' : ''}`}
            />
          </div>
          <button
            className="collapse-button"
            onClick={toggleSidebar}
            title={isCollapsed ? 'Expandir' : 'Minimizar'}
            type="button"
          >
            <i className={`fas ${isCollapsed ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          <button
            type="button"
            className={`nav-item${currentView === 'dashboard' ? ' active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <div className="nav-content">
              <i className="bi bi-speedometer2"></i>
              <span className={`nav-text${isCollapsed ? ' hidden' : ''}`}>Inicio</span>
            </div>
          </button>

          {userRole === 'admin' && (
            <>
              <button
                type="button"
                className={`nav-item${currentView === 'users' ? ' active' : ''}`}
                onClick={() => onNavigate('users')}
              >
                <div className="nav-content">
                  <i className="bi bi-people"></i>
                  <span className={`nav-text${isCollapsed ? ' hidden' : ''}`}>Usuarios</span>
                </div>
              </button>
              <button
                type="button"
                className={`nav-item${currentView === 'inventory' ? ' active' : ''}`}
                onClick={() => onNavigate('inventory')}
              >
                <div className="nav-content">
                  <i className="bi bi-box"></i>
                  <span className={`nav-text${isCollapsed ? ' hidden' : ''}`}>Inventario</span>
                </div>
              </button>
              <button
                type="button"
                className={`nav-item${currentView === 'proveedores' ? ' active' : ''}`}
                onClick={() => onNavigate('proveedores')}
              >
                <div className="nav-content">
                  <i className="bi bi-truck"></i>
                  <span className={`nav-text${isCollapsed ? ' hidden' : ''}`}>Proveedores</span>
                </div>
              </button>
              <button
                type="button"
                className={`nav-item${currentView === 'estadisticas' ? ' active' : ''}`}
                onClick={() => onNavigate('estadisticas')}
              >
                <div className="nav-content">
                  <i className="bi bi-bar-chart"></i>
                  <span className={`nav-text${isCollapsed ? ' hidden' : ''}`}>Estadísticas</span>
                </div>
              </button>
              <button
                type="button"
                className={`nav-item${currentView === 'reports' ? ' active' : ''}`}
                onClick={() => onNavigate('reports')}
              >
                <div className="nav-content">
                  <i className="bi bi-file-earmark-text"></i>
                  <span className={`nav-text${isCollapsed ? ' hidden' : ''}`}>Reportes</span>
                </div>
              </button>
              <button
                type="button"
                className={`nav-item${currentView === 'entry' ? ' active' : ''}`}
                onClick={() => onNavigate('entry')}
              >
                <div className="nav-content">
                  <i className="bi bi-arrow-left-right"></i>
                  <span className={`nav-text${isCollapsed ? ' hidden' : ''}`}>Entradas/Salidas</span>
                </div>
              </button>
            </>
          )}

          <button
            type="button"
            className={`nav-item${currentView === 'sell' ? ' active' : ''}`}
            onClick={() => onNavigate('sell')}
          >
            <div className="nav-content">
              <i className="bi bi-cart"></i>
              <span className={`nav-text${isCollapsed ? ' hidden' : ''}`}>Ventas</span>
            </div>
          </button>
          <button
            type="button"
            className={`nav-item${currentView === 'settings' ? ' active' : ''}`}
            onClick={() => onNavigate('settings')}
          >
            <div className="nav-content">
              <i className="bi bi-gear"></i>
              <span className={`nav-text${isCollapsed ? ' hidden' : ''}`}>Ajustes</span>
            </div>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;