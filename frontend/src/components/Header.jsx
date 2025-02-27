import { useState } from 'react';
import { Dropdown, Badge, Modal, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileImage, setProfileImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH_iwynnKUnSZbPBC5SiPy6Ay9-3cIEezn6w&s');
  const [profileData, setProfileData] = useState({
    name: 'Jefferson',
    email: 'jefferson@westcol.com',
    role: 'Administrador'
  });

  const notifications = [
    { id: 1, text: '2 Productos vencidos', time: 'Hace 5 minutos', read: false },
    { id: 2, text: 'Faltan productos de una categoria!', time: 'Hace una hora', read: false },
    { id: 3, text: 'Nuevo usuario registrado', time: 'Hace dos horas', read: false }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setShowProfileModal(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 py-3 shadow-sm">
      <div className="d-flex justify-content-between w-100 align-items-center">
        <h4 className="mb-0">Dashboard</h4>
        <div className="d-flex align-items-center">
          <Dropdown show={showNotifications} onToggle={setShowNotifications}>
            <Dropdown.Toggle variant="link" className="text-dark position-relative me-3 bg-transparent border-0">
              <i className="bi bi-bell fs-5"></i>
              <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-pill">
                {notifications.filter(n => !n.read).length}
              </Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end" style={{ minWidth: '300px' }}>
              <h6 className="dropdown-header">Notificaciones</h6>
              {notifications.map(notification => (
                <Dropdown.Item key={notification.id} className={!notification.read ? 'bg-light' : ''}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-0">{notification.text}</p>
                      <small className="text-muted">{notification.time}</small>
                    </div>
                    {!notification.read && <Badge bg="primary">New</Badge>}
                  </div>
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item className="text-center">Ver todas las notificaciones</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="link" className="bg-transparent border-0 p-0">
              {/* Imagen de perfil en un círculo */}
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-circle"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item onClick={() => setShowProfileModal(true)}>
                <i className="bi bi-person me-2"></i>Editar perfil
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="bi bi-gear me-2"></i>Ajustes
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Link to={"/login/"} className="bi bi-box-arrow-right me-2"> Logout</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProfileSubmit}>
            <div className="text-center mb-3">
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-circle mb-2"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <div>
                <Form.Label className="btn btn-outline-primary btn-sm">
                  Cambiar foto
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </Form.Label>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                type="text"
                value={profileData.role}
                readOnly
                disabled
              />
            </Form.Group>
            <div className="text-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowProfileModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </nav>
  );
}

export default Header;
