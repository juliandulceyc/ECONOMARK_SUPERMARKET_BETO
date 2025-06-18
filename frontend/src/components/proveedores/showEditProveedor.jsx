import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import API from "../services/axiosConfig";

const ShowEditProveedor = ({ showModal, handleClose, proveedor, refreshProveedores }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        contacto: "",
        telefono: "",
        email: "",
        direccion: "",
    });

    useEffect(() => {
        if (proveedor) {
            setFormData(proveedor); 
        }
    }, [proveedor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/proveedores/update/${formData.id}`, formData);
            alert("Proveedor actualizado con éxito.");
            refreshProveedores();
            handleClose();
        } catch (error) {
            console.error("Error al actualizar proveedor:", error);
            alert("No se pudo actualizar el proveedor.");
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Proveedor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contacto</Form.Label>
                        <Form.Control
                            name="contacto"
                            value={formData.contacto}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
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
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="mt-3">
                        Guardar Cambios
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ShowEditProveedor;
