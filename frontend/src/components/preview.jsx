import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Spinner, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompShowCategories from './showCategories';

const URL = 'http://localhost:3000/tablas/';

const CompTablePreview = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    // Procedimiento para mostrar todos los productos
    const getProducts = async () => {
        const response = await axios.get(URL);
        setProducts(response.data);
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Vista Previa de Tablas</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="table-responsive card shadow-sm">
                    <Table className="table table-hover mb-0">
                        <thead>
                            <tr className="table-header-gradient text-white">
                                <th className="text-center py-3 border-end">ID</th>
                                <th className="text-center py-3 border-end">ARTICULO</th>
                                <th className="text-center py-3 border-end">CATEGORIA</th>
                                <th className="text-center py-3 border-end">PRECIO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="text-center align-middle border-end">{product.id}</td>
                                    <td className="text-center align-middle border-end">{product.nombre}</td>
                                    <td className="text-center align-middle border-end">{product.categoria}</td>
                                    <td className="text-center align-middle border-end">{product.precio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default CompTablePreview;
