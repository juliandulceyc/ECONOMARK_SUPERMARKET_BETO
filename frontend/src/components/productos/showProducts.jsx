import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Importa SweetAlert2
import SearchBar from "../common/SearchBar";
import { Table, Button, Form, Modal, Spinner, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/show.css'
import Inventario from "../inventario/inventario";

// Modal reutilizable para crear/editar productos
const FormModal = ({ showModal, setShowModal, handleSubmit, editData, handleChange, config }) => (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>
                {editData?.[config.idField] ? "Editar" : "Crear"} {config.label.slice(0, -1)}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {Object.keys(config.initialData).map((key) => (
                    <Form.Group key={key} className="mb-3">
                        <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                        <Form.Control
                            name={key}
                            value={editData?.[key] || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                ))}
                <div className="text-end">
                    <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary">
                        Guardar
                    </Button>
                </div>
            </Form>
        </Modal.Body>
    </Modal>
);

const CompShowProducts = () => {
    const [tableView, setTableView] = useState("products");
    const [dataList, setDataList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterByColumn, setFilterByColumn] = useState('');
    const [filterByValue, setFilterByValue] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const config = Inventario[tableView];

    // Función para obtener los datos de las tablas
    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(config.url);
            setDataList(res.data);
            if (tableView === 'products') {
                const uniqueCategories = [...new Set(res.data.map(product => product.idCategoria))];
                setCategories(uniqueCategories);
            }
        } catch (err) {
            setError('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tableView]);

    // Función para eliminar un producto
    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        });

        if (confirmDelete.isConfirmed) {
            try {
                await axios.delete(`${config.url}${id}`);
                await Swal.fire(
                    'Eliminado!',
                    'El producto ha sido eliminado.',
                    'success'
                );
                fetchData();
            } catch (err) {
                Swal.fire(
                    'Error!',
                    'Hubo un problema al eliminar el producto.',
                    'error'
                );
            }
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const idValue = editData[config.idField];

        try {
            if (idValue) {
                await axios.put(`${config.url}${idValue}`, editData);
                await Swal.fire(
                    '¡Actualizado!',
                    `${config.label.slice(0, -1)} actualizado con éxito.`,
                    'success'
                );
            } else {
                await axios.post(config.url, editData);
                await Swal.fire(
                    '¡Creado!',
                    `${config.label.slice(0, -1)} creado con éxito.`,
                    'success'
                );
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            Swal.fire(
                'Error!',
                'Hubo un problema al guardar los datos.',
                'error'
            );
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    // Filtrado de datos
    const filteredData = useMemo(() => {
        return dataList.filter(item => {
            const matchesSearch = Object.keys(item).some(key =>
                item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
            );
            const matchesColumnFilter = filterByColumn
                ? item[filterByColumn]?.toString().toLowerCase().includes(filterByValue.toLowerCase())
                : true;
            return matchesSearch && matchesColumnFilter;
        });
    }, [dataList, searchQuery, filterByColumn, filterByValue]);

    return (
        <div className="container">
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Select
                className="mb-3"
                value={tableView}
                onChange={(e) => setTableView(e.target.value)}
            >
                {Object.entries(Inventario).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                ))}
            </Form.Select>

            <Button className="btn btn-primary w-100 mb-3" onClick={() => {
                setEditData({ ...config.initialData });
                setShowModal(true);
            }}>
                <i className="fas fa-plus-square"></i> Añadir {config.label.slice(0, -1)}
            </Button>

            <div className="mt-4">
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    filterByColumn={filterByColumn}
                    filterByValue={filterByValue}
                    onFilterColumnChange={setFilterByColumn}
                    onFilterValueChange={setFilterByValue}
                    columns={config.columns}
                    categories={categories}
                />
            </div>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <div className="table-responsive card shadow-sm">
                    <Table className="table table-hover mb-0">
                        <thead className="table-header-gradient text-white">
                            <tr>
                                {config.columns.map(col => (
                                    <th key={col.key} className="text-center border-end py-3">{col.label}</th>
                                ))}
                                <th className="text-center border-end py-3">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(item => (
                                <tr key={item[config.idField]}>
                                    {config.columns.map(col => (
                                        <td key={col.key} className="text-center border-end align-middle">
                                            {item[col.key]}
                                        </td>
                                    ))}
                                    <td className="text-center border-end">
                                        <Button className="btn btn-info mx-2 my-2" onClick={() => {
                                            setEditData(item);
                                            setShowModal(true);
                                        }}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                        <Button className="btn btn-danger" onClick={() => handleDelete(item[config.idField])}>
                                            <i className="fa-solid fa-eraser"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

            <FormModal
                showModal={showModal}
                setShowModal={setShowModal}
                handleSubmit={handleSubmit}
                editData={editData}
                handleChange={handleChange}
                config={config}
            />
        </div>
    );
};

export default CompShowProducts;
