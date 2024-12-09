import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from 'react-bootstrap';
import SearchBar from "./SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import CompShowCategories from "./showCategories";
import CompEditProduct from "./editProduct";
import CompCreateProduct from "./createProduct"; 

const URL = 'http://localhost:3000/tablas/';

const CompShowProducts = () => {
    const [tableView, setTableView] = useState('products');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const handleAdd = () => {
        setShowCreateModal(true);
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setShowEditModal(true);
    };

    const handleCloseEdit = () => {
        setShowEditModal(false);
        setEditProduct(null);
    };

    const handleCloseCreate = () => {
        setShowCreateModal(false);
    };

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts();
    }, []);

    // Procedimiento para mostrar todos los productos
    const getProducts = async () => {
        const response = await axios.get(URL);
        setProducts(response.data);
    };

    // Procedimiento para eliminar un producto
    const deleteProduct = async (id) => {
        await axios.delete(`${URL}${id}`);
        getProducts();
    };

    const renderTable = () => {
        // Solo estructuras de tablas 
        switch (tableView) {
            case 'products':
                return (
                    <div className="table-responsive card shadow-sm">
                        <Table className="table table-hover mb-0">
                            <thead>
                                <tr className="table-header-gradient text-white">
                                    <th className="text-center py-3 border-end">ID</th>
                                    <th className="text-center py-3 border-end">ARTICULO</th>
                                    <th className="text-center py-3 border-end">CATEGORIA</th>
                                    <th className="text-center py-3 border-end">PRECIO</th>
                                    <th className="text-center py-3 border-end">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="text-center align-middle border-end">{product.id}</td>
                                        <td className="text-center align-middle border-end">{product.nombre}</td>
                                        <td className="text-center align-middle border-end">{product.categoria}</td>
                                        <td className="text-center align-middle border-end">{product.precio}</td>
                                        <td className="text-center align-middle border-end">
                                            {/* Boton editar */}
                                            <Button onClick={() => handleEdit(product)} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Button>
                                            <button onClick={() => deleteProduct(product.id)} className="btn btn-danger"><i className="fa-solid fa-eraser"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                );
            case 'categories':
                return <CompShowCategories />;
            default:
                return null;
        }
    };

    return (
        // Anclaje de apartado productos
        <div className="container">
            <select type='text' name='rol' className="form-select" aria-label="Default select example">
                <option value=''></option>
                <option onClick={() => setTableView('products')} value='admin'>Productos</option>
                <option onClick={() => setTableView('categories')} value='empleado' >Categorias</option>
            </select>
            {/* Boton de añadir */}
            <Button onClick={handleAdd} className="btn btn-primary mt-4 w-100">
                <i className="fas fa-plus-square"></i> Añadir
            </Button>
            <div className="mt-4">
                <SearchBar />
            </div>
            <div className="card-body">
                {renderTable()}
            </div>

            <CompEditProduct
                showModal={showEditModal}
                handleClose={handleCloseEdit}
                product={editProduct}
                refreshProducts={getProducts}
            />

            <CompCreateProduct
                showModal={showCreateModal}
                handleClose={handleCloseCreate}
                refreshProducts={getProducts}
            />
        </div>
    );
};

export default CompShowProducts;
