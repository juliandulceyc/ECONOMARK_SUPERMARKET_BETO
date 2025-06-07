import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from 'react-bootstrap';

const URL = 'http://172.210.65.94:3000/productos/';

const CompEditProduct = ({ showModal, handleClose, product, refreshProducts }) => {
    const [nombreProducto, setNombreProducto] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [stock, setStock] = useState('');
    const [estado, setEstado] = useState('');

    useEffect(() => {
        if (product) {
            setNombreProducto(product.nombreProducto);
            setIdCategoria(product.idCategoria);
            setPrecioVenta(product.precioVenta);
            setStock(product.stock);
            setEstado(product.estado);
        }
    }, [product]);

    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${URL}${product.idProducto}`, {
            nombreProducto,
            idCategoria,
            precioVenta,
            stock,
            estado
        });
        refreshProducts();
        handleClose();
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
                            value={nombreProducto}
                            onChange={(e) => setNombreProducto(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Categoría (ID)</Form.Label>
                        <Form.Control
                            type="number"
                            value={idCategoria}
                            onChange={(e) => setIdCategoria(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            value={precioVenta}
                            onChange={(e) => setPrecioVenta(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un estado</option>
                            <option value="Activo">Disponible</option>
                            <option value="Inactivo">No disponible</option>
                        </Form.Select>
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
