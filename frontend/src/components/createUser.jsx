import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Modal, Form } from 'react-bootstrap';

const URL = 'http://localhost:3000/credenciales/';

const CompCreateUser = ({ showModal, handleClose, refreshUsers }) => {
    const [rol, setRol] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Procedimiento para guardar
    const store = async (e) => {
        e.preventDefault();
        await axios.post(URL, { rol, username, password });
        refreshUsers(); // Refresca la lista de productos después de añadir uno nuevo
        handleClose(); // Cierra el modal
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Añadir usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={store}>
                    <Form.Group className="mb-3">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control
                            as="select"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                            required
                        >
                            <option value=''></option>
                            <option value='admin'>Admin</option>
                            <option value='empleado'>Empleado</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="text-end">
                        <Button variant="secondary" className="me-2" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Añadir
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CompCreateUser;
