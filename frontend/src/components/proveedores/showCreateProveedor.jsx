import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import API from "../services/axiosConfig"; 

const ShowCreateProveedor = ({ showModal, handleClose, refreshProveedores }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        contacto: "",
        telefono: "",
        email: "",
        direccion: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/proveedores/register", formData); // 
            alert("Proveedor registrado con éxito.");
            refreshProveedores();
            handleClose();

            // Restablece todos los campos del formulario después del cierre
            setFormData({
                nombre: "",
                contacto: "",
                telefono: "",
                email: "",
                direccion: "",
            });
        } catch (error) {
            console.error("Error al registrar proveedor:", error);
            alert("Ocurrió un error. Por favor, inténtalo nuevamente.");
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Registrar Proveedor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ingrese el nombre del proveedor"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control
                            name="contacto"
                            value={formData.contacto}
                            onChange={handleChange}
                            placeholder="Ingrese el contacto del proveedor"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Ingrese el teléfono del proveedor"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ingrese el email del proveedor"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            placeholder="Ingrese la dirección del proveedor"
                            required
                        />
                    </Form.Group>
                    <Button className="mt-3" type="submit" variant="primary">
                        Registrar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
ShowCreateProveedor.propTypes = {
    showModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    refreshProveedores: PropTypes.func.isRequired,
};

export default ShowCreateProveedor;