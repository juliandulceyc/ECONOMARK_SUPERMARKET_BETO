import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Sidebar from '../layout/Sidebar';
import DashboardStats from './DashboardStats';
import Header from '../layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../App.css';
import CompShowProducts from '../productos/showProducts';
import CompShowUsers from '../usuarios/showUsers';
import CompShowProveedores from '../proveedores/showProveedores'; 
import Ventas from '../ventas/ventas';
import Reports from '../reportes/Reports';
import Preview from '../preview/preview';
import Settings from '../settings/settings'; 
import MainMenu from '../pages/Inicio';
import MenuChart from '../MenuChart';
import EntradasSalidasMenu from '../entradasSalidas/EntradasSalidasMenu';
import API from '../services/axiosConfig';

function Home() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userRole, setUserRole] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // 🚩 Verifica el token antes de renderizar Home
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Función para obtener el rol del usuario
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await API.get('/auth/home', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const { username, correo, rol } = response.data.user;
      setProfileData({ name: username, email: correo, role: rol });
      setUserRole(rol);
    } catch (err) {
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

  // Loader mientras se obtiene el usuario
  if (userRole === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" aria-label="Cargando" />
        <output className="ms-2">Cargando...</output>
      </div>
    );
  }

  // Función para renderizar el contenido principal
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <MainMenu />;
      case 'inventory':
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
      case 'estadisticas':
        return <MenuChart />;
      case 'sell':
        return <Ventas cajero={profileData.name} />;
      case 'entry':
        return <EntradasSalidasMenu />;
      case 'analytics':
        return <Preview />;
      case 'settings':
        return <Settings profileData={profileData} />;
      default:
        return <div>Próximamente</div>;
    }
  };

  // Alternar el estado de colapsado del sidebar
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
        <Header currentView={currentView} profileData={profileData} />
        <Container fluid className="px-4 py-4">
          {renderContent()}
        </Container>
      </div>
    </div>
  );
}

export default Home;