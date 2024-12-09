import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from 'react-bootstrap'; //punto de restauración

const URL = 'http://localhost:3000/tablas/';

const CompEditProduct = ({ showModal, handleClose, product, refreshProducts }) => {
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');

    useEffect(() => {
        if (product) {
            setNombre(product.nombre);
            setCategoria(product.categoria);
            setPrecio(product.precio);
        }
    }, [product]);

    // Procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault();
        await axios.put(URL + product.id, {
            nombre, categoria, precio
        });
        refreshProducts(); // Refresca la lista de productos después de actualizar
        handleClose(); // Cierra el modal
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={update}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            type="text"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
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

export default CompEditProduct;
