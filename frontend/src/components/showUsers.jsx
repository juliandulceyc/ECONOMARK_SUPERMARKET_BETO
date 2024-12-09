import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Table, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import DashboardStats from '../components/DashboardStats';
import SalesChart from '../components/SalesChart';
import RecentOrders from '../components/RecentOrders';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import SearchBar from "./SearchBar";
import CompEditUser from "./editUser";
import CompCreateUser from "./createUser";

const URL = 'http://localhost:3000/credenciales/'


const CompShowUsers = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editUser, setEditUser] = useState(null);

    const handleAdd = () => {
        setShowCreateModal(true);
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setShowEditModal(true);
    };

    const handleCloseEdit = () => {
        setShowEditModal(false);
        setEditProduct(null);
    };

    const handleCloseCreate = () => {
        setShowCreateModal(false);
    };

    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers()
    }, [])

    //procedimiento para mostar todos los usuarios
    const getUsers = async () => {
        const response = await axios.get(URL)
        setUsers(response.data)
    }

    //procedimiento para eliminar un usuario
    const deleteUser = async (id) => {
        await axios.delete(`${URL}${id}`)
        getUsers()
    }

    return (
        <div className="container">
            <Button onClick={handleAdd} className="btn btn-primary mt-4 w-100">
                <i className="fas fa-plus-square"></i>
            </Button>
            <div className="mt-4">
                <SearchBar></SearchBar>
            </div>
            <div className="table-responsive card shadow-sm">
                <Table className="table table-hover mb-0">
                    <thead>
                        <tr className="table-header-gradient text-white">
                            <th className="text-center py-3 border-end">ROL</th>
                            <th className="text-center py-3 border-end">USERNAME</th>
                            <th className="text-center py-3 border-end">PASSWORD</th>
                            <th className="text-center py-3 border-end">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="text-center align-middle border-end">{user.rol}</td>
                                <td className="text-center align-middle border-end">{user.username}</td>
                                <td className="text-center align-middle border-end">{user.password}</td>
                                <td className="text-center align-middle border-end">
                                    <Button onClick={() => handleEdit(user)} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Button>
                                    <Button onClick={() => deleteUser(user.id)} className="btn btn-danger"><i className="fa-solid fa-eraser"></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <CompEditUser
                showModal={showEditModal}
                handleClose={handleCloseEdit}
                user={editUser}
                refreshUsers={getUsers}
            />
            <CompCreateUser
                showModal={showCreateModal}
                handleClose={handleCloseCreate}
                refreshUsers={getUsers}
            />

        </div>
    )
}

export default CompShowUsers