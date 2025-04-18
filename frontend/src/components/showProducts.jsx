import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import { Table, Button, Form, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './show.css'

const entityConfig = {
    products: {
        label: "Productos",
        url: "http://localhost:3000/productos/",
        columns: [
            { key: "idProducto", label: "ID" },
            { key: "nombreProducto", label: "ARTICULO" },
            { key: "idCategoria", label: "CATEGORIA" },
            { key: "precioVenta", label: "PRECIO" },
            { key: "stock", label: "STOCK" },
            { key: "estado", label: "ESTADO" }
        ],
        initialData: {
            nombreProducto: "", idCategoria: "", precioVenta: "", stock: "", estado: ""
        },
        idField: "idProducto"
    },
    categorias: {
        label: "Categorias",
        url: "http://localhost:3000/categorias/",
        columns: [
            { key: "idCategoria", label: "ID" },
            { key: "nombreCategoria", label: "NOMBRE" },
            { key: "descripcionCategoria", label: "DESCRIPCIÓN" },
            { key: "estado", label: "ESTADO" }
        ],
        initialData: {
            nombreCategoria: "", descripcionCategoria: "", estado: ""
        },
        idField: "idCategoria"
    },
    clientes: {
        label: "Clientes",
        url: "http://localhost:3000/clientes/",
        columns: [
            { key: "idCliente", label: "ID" },
            { key: "nombreCliente", label: "NOMBRE" },
            { key: "telefono", label: "TELEFONO" },
            { key: "email", label: "EMAIL" }
        ],
        initialData: {
            nombreCliente: "", telefono: "", email: ""
        },
        idField: "idCliente"
    },
    entradas: {
        label: "Entradas",
        url: "http://localhost:3000/entradas/",
        columns: [
            { key: "idEntrada", label: "ID" },
            { key: "idProveedor", label: "PROVEEDOR" },
            { key: "idUsuario", label: "USUARIO" },
            { key: "tipo_comprobante", label: "TIPO COMPROBANTE" },
            { key: "serie_comprobante", label: "SERIE COMPROBANTE" },
            { key: "num_comprobante", label: "NUMERO COMPROBANTE" },
            { key: "fecha", label: "FECHA" },
            { key: "impuesto", label: "IMPUESTO" },
            { key: "total", label: "TOTAL" },
            { key: "estado", label: "ESTADO" }
        ],
        initialData: {
            idProveedor: "", idUsuario: "", tipo_comprobante: "", serie_comprobante: "", num_comprobante: "", fecha: "", impuesto: "", total: "", estado: ""
        },
        idField: "idEntrada"
    },
    proveedores: {
        label: "Proveedores",
        url: "http://localhost:3000/proveedores/",
        columns: [
            { key: "idProveedor", label: "ID" },
            { key: "nombreProveedor", label: "NOMBRE" },
            { key: "email", label: "EMAIL" },
            { key: "telefono", label: "TELÉFONO" },
        ],
        initialData: {
            nombreProveedor: "", telefono: ""
        },
        idField: "idProveedor"
    },
    detalle_entradas: {
        label: "Detalle Entradas",
        url: "http://localhost:3000/detalleentradas/",
        columns: [
            { key: "idDetalle_entrada", label: "ID" },
            { key: "idEntrada", label: "ENTRADA" },
            { key: "idProducto", label: "PRODUCTO" },
            { key: "cantidad", label: "CANTIDAD" },
            { key: "precio", label: "PRECIO" }
        ],
        initialData: {
            idEntrada: "",
            idProducto: "",
            cantidad: "",
            precio: ""
        },
        idField: "idDetalle_entrada"
    },
    ventas: {
        label: "Ventas",
        url: "http://localhost:3000/ventas/",
        columns: [
            { key: "idVenta", label: "ID" },
            { key: "idCliente", label: "CLIENTE" },
            { key: "idUsuario", label: "USUARIO" },
            { key: "tipo_comprobante", label: "TIPO DE COMPROBANTE" },
            { key: "serie_comprobante", label: "SERIE COMPROBANTE" },
            { key: "num_comprobante", label: "NÚMERO DE COMPROBANTE" },
            { key: "fecha_hora", label: "FECHA Y HORA" },
            { key: "impuesto", label: "IMPUESTO" },
            { key: "total", label: "TOTAL" },
            { key: "estado", label: "ESTADO" }
        ],
        initialData: {
            idCliente: "",
            idUsuario: "",
            tipo_comprobante: "",
            serie_comprobante: "",
            num_comprobante: "",
            fecha_hora: "",
            impuesto: "",
            total: "",
            estado: ""
        },
        idField: "idVenta"
    }


};

const CompShowProducts = () => {
    const [tableView, setTableView] = useState("products");
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
        const res = await axios.get(config.url);
        setDataList(res.data);

        // Si la entidad es productos, podemos obtener las categorías
        if (tableView === 'products') {
            const uniqueCategories = [...new Set(res.data.map(product => product.idCategoria))];
            setCategories(uniqueCategories);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tableView]);

    const handleDelete = async (id) => {
        await axios.delete(`${config.url}${id}`);
        fetchData();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const idValue = editData[config.idField];

        if (idValue) {
            await axios.put(`${config.url}${idValue}`, editData);
        } else {
            await axios.post(config.url, editData);
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

export default CompShowProducts;
