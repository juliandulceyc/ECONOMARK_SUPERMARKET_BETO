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
import { Reports } from './reportes/Reports';
import Preview from "./preview";
import Settings from './settings';

function Home() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userRole, setUserRole] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/auth/home', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401 || response.status === 403) {
        navigate('/login', { replace: true });
      } else {
        const userRole = response.data.user.rol;
        console.log("Rol obtenido:", userRole);
        setUserRole(userRole);
      }
    } catch (err) {
      navigate('/login', { replace: true });
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Bloquear que el usuario regrese al login usando el botón "atrás" del navegador.
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, document.title, window.location.href);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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
        if (userRole === 'admin') {
          return (
            <>
              <DashboardStats />
              <CompShowUsers />
            </>
          );
        } else {
          return <div>No tienes permisos para acceder a esta sección.</div>;
        }
      case 'proveedores':
        if (userRole === 'admin') {
          return (
            <>
              <DashboardStats />
              <CompShowProveedores />
            </>
          );
        } else {
          return <div>No tienes permisos para acceder a esta sección.</div>;
        }
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

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

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
