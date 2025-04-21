import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Sidebar from './Sidebar';
import DashboardStats from './DashboardStats';
import SalesChart from './SalesChart';
import RecentOrders from './RecentOrders';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import CompShowProducts from './showProducts';
import CompShowUsers from './showUsers';
import CompShowProveedores from './showProveedores'; // Componente para proveedores
import Ventas from './ventas/ventas';
import Reports from './reportes/Reports';
import Preview from './preview';
import Settings from './settings';

// Interceptor global para manejar expiración de token
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token expirado o inválido: limpiar y redirigir
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

function Home() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userRole, setUserRole] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Obtener usuario y rol
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/auth/home', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const role = response.data.user.rol;
      console.log('Rol obtenido:', role);
      setUserRole(role);
    } catch (err) {
      // Si hay error (p.ej. 401), redirigir al login
      navigate('/login', { replace: true });
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Bloquear botón atrás hacia login
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    const handlePopState = () => window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Renderizar contenido según vista seleccionada
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <>
            <SalesChart />
            <RecentOrders />
          </>
        );
      case 'products':
        return (
          <>
            <DashboardStats />
            <CompShowProducts />
          </>
        );
      case 'users':
        return userRole === 'admin' ? (
          <>
            <DashboardStats />
            <CompShowUsers />
          </>
        ) : (
          <div>No tienes permisos para acceder a esta sección.</div>
        );
      case 'proveedores':
        return userRole === 'admin' ? (
          <>
            <DashboardStats />
            <CompShowProveedores />
          </>
        ) : (
          <div>No tienes permisos para acceder a esta sección.</div>
        );
      case 'reports':
        return <Reports />;
      case 'sell':
        return <Ventas />;
      case 'analytics':
        return <Preview />;
      case 'settings':
        return <Settings />;
      default:
        return <div>Próximamente</div>;
    }
  };

  // Alternar colapsado del sidebar
  const handleToggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className="wrapper">
      <div className="sidebar-wrapper">
        <Sidebar
          onNavigate={setCurrentView}
          currentView={currentView}
          userRole={userRole}
          isCollapsed={isSidebarCollapsed}
          onToggle={handleToggleSidebar}
        />
      </div>
      <div className="main-content">
        <Header />
        <Container fluid className="px-4 py-4">
          {renderContent()}
        </Container>
      </div>
    </div>
  );
}

export default Home;
