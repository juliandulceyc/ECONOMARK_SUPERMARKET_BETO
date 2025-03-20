import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import ShowEditProveedor from "./showEditProveedor";
import ShowCreateProveedor from "./showCreateProveedor";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

const URL = "http://localhost:3000/proveedores/";

const ShowProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editProveedor, setEditProveedor] = useState(null);

    // Cargar los proveedores al inicio
    useEffect(() => {
        getProveedores();
    }, []);

    const getProveedores = async () => {
        try {
            const response = await axios.get(`${URL}list`);
            setProveedores(response.data);
        } catch (error) {
            console.error("Error al obtener los proveedores:", error);
            alert("No se pudieron cargar los proveedores.");
        }
    };

    const deleteProveedor = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este proveedor?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${URL}delete/${id}`);
            alert("Proveedor eliminado con éxito.");
            getProveedores();
        } catch (error) {
            console.error("Error al eliminar proveedor:", error);
            alert("No se pudo eliminar el proveedor.");
        }
    };

    const handleAdd = () => setShowCreateModal(true);

    const handleEdit = (proveedor) => {
        setEditProveedor(proveedor);
        setShowEditModal(true);
    };

    const handleCloseEdit = () => {
        setShowEditModal(false);
        setEditProveedor(null);
    };

    const handleCloseCreate = () => {
        setShowCreateModal(false);
    };

    return (
        <div className="container">
            <Button onClick={handleAdd} className="btn btn-primary mt-4 w-100">
                <i className="fas fa-plus-square"></i> Añadir Proveedor
            </Button>
            <div className="mt-4">
                <SearchBar />
            </div>
            <div className="table-responsive card shadow-sm mt-4">
                <Table className="table table-hover mb-0">
                    <thead>
                        <tr className="table-header-gradient text-white">
                            <th className="text-center py-3 border-end">ID</th>
                            <th className="text-center py-3 border-end">Nombre</th>
                            <th className="text-center py-3 border-end">Contacto</th>
                            <th className="text-center py-3 border-end">Teléfono</th>
                            <th className="text-center py-3 border-end">Email</th>
                            <th className="text-center py-3 border-end">Dirección</th>
                            <th className="text-center py-3 border-end">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map((proveedor) => (
                            <tr key={proveedor.id}>
                                <td className="text-center align-middle border-end">{proveedor.id}</td>
                                <td className="text-center align-middle border-end">{proveedor.nombre}</td>
                                <td className="text-center align-middle border-end">{proveedor.contacto || "N/A"}</td>
                                <td className="text-center align-middle border-end">{proveedor.telefono}</td>
                                <td className="text-center align-middle border-end">{proveedor.email}</td>
                                <td className="text-center align-middle border-end">{proveedor.direccion}</td>
                                <td className="text-center align-middle border-end">
                                    <Button
                                        onClick={() => handleEdit(proveedor)}
                                        className="btn btn-info mx-2"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                    <Button
                                        onClick={() => deleteProveedor(proveedor.id)}
                                        className="btn btn-danger"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <ShowEditProveedor
                showModal={showEditModal}
                handleClose={handleCloseEdit}
                proveedor={editProveedor}
                refreshProveedores={getProveedores}
            />
            <ShowCreateProveedor
                showModal={showCreateModal}
                handleClose={handleCloseCreate}
                refreshProveedores={getProveedores}
            />
        </div>
    );
};

export default ShowProveedores;
