import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import SearchBar from "./SearchBar";
import Inventario from "../components/inventario/inventario"; 

const { label, url, columns, initialData, idField } = Inventario["usuarios"];

const CompShowUsers = () => {
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(initialData);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);

    // NUEVO: Estados para filtro por columna
    const [filterByColumn, setFilterByColumn] = useState("");
    const [filterByValue, setFilterByValue] = useState("");

    const getData = async () => {
        const response = await axios.get(url);
        setData(response.data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`${url}${id}`);
        getData();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (editData[idField]) {
            await axios.put(`${url}${editData[idField]}`, editData);
        } else {
            await axios.post(url, editData);
        }
        setShowModal(false);
        getData();
    };

    // NUEVO: Filtrado mejorado
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            // Filtro general (solo si hay texto)
            const matchesSearch = searchQuery
                ? Object.values(item).some((value) =>
                    value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
                : true;
            // Filtro por columna (solo si hay columna y valor)
            const matchesColumn = filterByColumn && filterByValue
                ? ((item[filterByColumn] ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(filterByValue.toLowerCase()))
                : true;
            return matchesSearch && matchesColumn;
        });
    }, [data, searchQuery, filterByColumn, filterByValue]);

    return (
        <div className="container">
            <Button
                onClick={() => {
                    setEditData(initialData);
                    setShowModal(true);
                }}
                className="btn btn-primary mt-4 w-100"
            >
                <i className="fas fa-plus-square"></i> Añadir {label}
            </Button>

            <div className="mt-4">
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    filterByColumn={filterByColumn}
                    onFilterColumnChange={setFilterByColumn}
                    filterByValue={filterByValue}
                    onFilterValueChange={setFilterByValue}
                    columns={columns}
                />
            </div>

            <div className="table-responsive card shadow-sm mt-3">
                <Table className="table table-hover mb-0">
                    <thead className="table-header-gradient text-white">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="text-center py-3 border-end">
                                    {col.label}
                                </th>
                            ))}
                            <th className="text-center py-3 border-end">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item[idField]}>
                                {columns.map((col) => (
                                    <td key={col.key} className="text-center align-middle border-end">
                                        {item[col.key]}
                                    </td>
                                ))}
                                <td className="text-center align-middle border-end">
                                    <Button
                                        className="btn btn-info mx-2"
                                        onClick={() => {
                                            setEditData(item);
                                            setShowModal(true);
                                        }}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Button>
                                    <Button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(item[idField])}
                                    >
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
                    <Modal.Title>{editData[idField] ? "Editar" : "Crear"} {label}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        {Object.entries(initialData).map(([key, value]) => (
                            <Form.Group key={key} className="mb-3">
                                <Form.Label>{key.toUpperCase()}</Form.Label>
                                <Form.Control
                                    type={key === "password" ? "password" : "text"}
                                    value={editData[key] || ""}
                                    onChange={(e) =>
                                        setEditData({ ...editData, [key]: e.target.value })
                                    }
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

export default CompShowUsers;