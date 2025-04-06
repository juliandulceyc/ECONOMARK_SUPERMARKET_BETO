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
    const [searchQuery, setSearchQuery] = useState('');
    const [filterBy, setFilterBy] = useState('all');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const uniqueCategories = [...new Set(products.map(product => product.categoria))];
            setCategories(uniqueCategories);
        }
    }, [products]);

    const getProducts = async () => {
        const response = await axios.get(URL);
        setProducts(response.data);
    };

    const deleteProduct = async (id) => {
        await axios.delete(`${URL}${id}`);
        getProducts();
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.nombre.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterBy === 'all' || product.categoria === filterBy;
        return matchesSearch && matchesCategory;
    });

    const renderTable = () => {
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
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td className="text-center align-middle border-end">{product.id}</td>
                                        <td className="text-center align-middle border-end">{product.nombre}</td>
                                        <td className="text-center align-middle border-end">{product.categoria}</td>
                                        <td className="text-center align-middle border-end">{product.precio}</td>
                                        <td className="text-center align-middle border-end">
                                            <Button onClick={() => handleEdit(product)} className='btn btn-info mx-2'>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Button>
                                            <Button onClick={() => deleteProduct(product.id)} className="btn btn-danger">
                                                <i className="fa-solid fa-eraser"></i>
                                            </Button>
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
        <div className="container">
            <Form.Select
                className="mb-3"
                onChange={(e) => setTableView(e.target.value)}
                value={tableView}
            >
                <option value="products">Productos</option>
                <option value="categories">Categorías</option>
            </Form.Select>

            <Button onClick={() => setShowCreateModal(true)} className="btn btn-primary w-100">
                <i className="fas fa-plus-square"></i> Añadir
            </Button>

            <div className="mt-4">
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    filterBy={filterBy}
                    onFilterChange={setFilterBy}
                    categories={categories}
                />
            </div>

            <div className="card-body">
                {renderTable()}
            </div>

            <CompEditProduct
                showModal={showEditModal}
                handleClose={() => setShowEditModal(false)}
                product={editProduct}
                refreshProducts={getProducts}
            />

            <CompCreateProduct
                showModal={showCreateModal}
                handleClose={() => setShowCreateModal(false)}
                refreshProducts={getProducts}
            />
        </div>
    );
};

export default CompShowProducts;