import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form } from 'react-bootstrap';
import API from '../services/axiosConfig';

const CompCreateUser = ({ showModal, handleClose, refreshUsers }) => {
    const [rol, setRol] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const store = async (e) => {
        e.preventDefault();
        await API.post('/credenciales/', { rol, username, password }); // Cambia aquí
        refreshUsers(); 
        handleClose(); 
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
CompCreateUser.propTypes = {
    showModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    refreshUsers: PropTypes.func.isRequired,
};

export default CompCreateUser;

