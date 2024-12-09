import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

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
      <h2 className="my-4">Ajustes</h2>
      <Form onSubmit={handleSave}>
        <Card className="mb-4">
          <Card.Header>Ajustes de Perfil</Card.Header>
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
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header>Configuración de Notificaciones</Card.Header>
          <Card.Body>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Recibir notificaciones por correo electrónico"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header>Opciones de Tema</Card.Header>
          <Card.Body>
            <Form.Group>
              <Form.Label>Tema</Form.Label>
              <Form.Control
                as="select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
              </Form.Control>
            </Form.Group>
          </Card.Body>
        </Card>

        <div className="text-end">
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Settings;
