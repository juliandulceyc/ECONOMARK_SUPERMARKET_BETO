import { Nav } from 'react-bootstrap';

function Sidebar() {
  return (
    <div className="bg-dark text-white h-100 sidebar">
      <div className="sidebar-sticky">
        <div className="py-4 px-3">
          <h5>Panel de Administración</h5>
        </div>
        <Nav className="flex-column">
          <Nav.Link href="#" className="text-white">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </Nav.Link>
          <Nav.Link href="#" className="text-white">
            <i className="bi bi-people me-2"></i>
            Usuarios
          </Nav.Link>
          <Nav.Link href='tablas/' className="text-white">
            <i className="bi bi-cart me-2"></i>
            Productos
          </Nav.Link>
          <Nav.Link href="#" className="text-white">
            <i className="bi bi-graph-up me-2"></i>
            Analisis
          </Nav.Link>
          <Nav.Link href="#" className="text-white">
            <i className="bi bi-gear me-2"></i>
            Configuracion
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;