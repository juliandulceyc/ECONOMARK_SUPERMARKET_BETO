import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from 'react-bootstrap'; //punto de restauración

const URL = 'http://localhost:3000/credenciales/';

const CompEditUser = ({ showModal, handleClose, user, refreshUsers }) => {
    const [rol, setRol] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setRol(user.rol);
            setUsername(user.username);
            setPassword(user.password);
        }
    }, [user]);

    // Procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();
        await axios.put(URL + user.id, {
            rol, username, password
        });
        refreshUsers(); // Refresca la lista de productos después de actualizar
        handleClose(); // Cierra el modal
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={update}>
                    <Form.Group className="mb-3">
                        <select onChange={(e) => setRol(e.target.value)} type='text' name='rol' className="form-select" aria-label="Default select example">
                            <option value=''></option>
                            <option value='admin'>Admin</option>
                            <option value='empleado' >Empleado</option>
                        </select>
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
                            Guardar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CompEditUser;
