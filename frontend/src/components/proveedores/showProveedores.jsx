import React, { useState, useEffect } from "react";
import API from "../services/axiosConfig"; 
import SearchBar from "../common/SearchBar";
import { Table, Button, Form, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/show.css'

const entityConfig = {
    proveedores: {
        label: "Proveedoress",
        url: "/proveedores/", // Solo el endpoint
        columns: [
            { key: "idProveedor", label: "ID" },
            { key: "nombreProveedor", label: "NOMBRE" },
            { key: "email", label: "EMAIL" },
            { key: "telefono", label: "TELÉFONO" },
        ],
        initialData: {
            nombreProveedor: "", email: "", telefono: ""
        },
        idField: "idProveedor"
    }
};

const CompShowProveedores = () => {
    const [tableView, setTableView] = useState("proveedores");
    const [dataList, setDataList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterByColumn, setFilterByColumn] = useState('');
    const [filterByValue, setFilterByValue] = useState('');
    const [categories, setCategories] = useState([]);

    const config = entityConfig[tableView];

    // Función para obtener los datos de las entidades (productos o categorías)
    const fetchData = async () => {
        const res = await API.get(config.url); // Cambia aquí
        setDataList(res.data);

        if (tableView === 'products') {
            const uniqueCategories = [...new Set(res.data.map(product => product.idCategoria))];
            setCategories(uniqueCategories);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tableView]);

    const handleDelete = async (id) => {
        await API.delete(`${config.url}${id}`); // Cambia aquí
        fetchData();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const idValue = editData[config.idField];

        if (idValue) {
            await API.put(`${config.url}${idValue}`, editData); // Cambia aquí
        } else {
            await API.post(config.url, editData); // Cambia aquí
        }

        setShowModal(false);
        fetchData();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    // Función para filtrar los datos basados en la búsqueda y el filtro por columna
    const filteredData = dataList.filter(item => {
        const matchesSearch = Object.keys(item).some(key =>
            item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
        const matchesColumnFilter = filterByColumn
            ? item[filterByColumn]?.toString().toLowerCase().includes(filterByValue.toLowerCase())
            : true;
        return matchesSearch && matchesColumnFilter;
    });

    return (
        <div className="container">
            <Form.Select
                className="mb-3"
                value={tableView}
                onChange={(e) => setTableView(e.target.value)}
            >
                {Object.entries(entityConfig).map(([key, val]) => (
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
                                    <Button className="btn btn-info mx-2" onClick={() => {
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
        </div>
    );
};

export default CompShowProveedores;
