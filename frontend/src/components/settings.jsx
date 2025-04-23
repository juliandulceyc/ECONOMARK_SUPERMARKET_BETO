import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Person, Envelope, Bell, Palette } from 'react-bootstrap-icons'; // Usando íconos más sutiles

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');

  const handleSave = (e) => {
    e.preventDefault();
    // Lógica para guardar los ajustes
    console.log('Ajustes guardados:', { username, email, notifications, theme });
    alert('Ajustes guardados correctamente');
  };

  return (
    <div className="settings">
      <h2 className="my-4 text-center" style={{ color: '#6c757d' }}>Ajustes de Perfil</h2>
      <Form onSubmit={handleSave}>
        {/* Card de Ajustes de Perfil */}
        <Card className="mb-4 shadow-sm border-light">
          <Card.Header style={{ backgroundColor: '#f8f9fa', color: '#495057' }}>
            <Person style={{ marginRight: '10px', fontSize: '1.2em' }} />
            Ajustes de Perfil
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresa tu nombre de usuario"
                    required
                    style={{ borderColor: '#dcdfe1' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo electrónico"
                    required
                    style={{ borderColor: '#dcdfe1' }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Card de Configuración de Notificaciones */}
        <Card className="mb-4 shadow-sm border-light">
          <Card.Header style={{ backgroundColor: '#f8f9fa', color: '#495057' }}>
            <Bell style={{ marginRight: '10px', fontSize: '1.2em' }} />
            Configuración de Notificaciones
          </Card.Header>
          <Card.Body>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Recibir notificaciones por correo electrónico"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              style={{ color: '#495057' }}
            />
          </Card.Body>
        </Card>

        {/* Card de Opciones de Tema */}
        <Card className="mb-4 shadow-sm border-light">
          <Card.Header style={{ backgroundColor: '#f8f9fa', color: '#495057' }}>
            <Palette style={{ marginRight: '10px', fontSize: '1.2em' }} />
            Opciones de Tema
          </Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>Tema</Form.Label>
              <Form.Control
                as="select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{ borderColor: '#dcdfe1' }}
              >
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
              </Form.Control>
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Botón para guardar */}
        <div className="text-end">
          <Button
            variant="primary"
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              borderRadius: '5px',
            }}
          >
            Guardar Cambios
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Settings;
