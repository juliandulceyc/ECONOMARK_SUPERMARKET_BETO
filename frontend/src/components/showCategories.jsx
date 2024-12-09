import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown, Table, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';

const URL = 'http://localhost:3000/categorias/'



const CompShowCategories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
    }, [])

    //procedimiento para mostar todas las categorias
    const getCategories = async () => {
        const response = await axios.get(URL)
        setCategories(response.data)
    }

    //procedimiento para eliminar un producto
    const deleteCategory = async (id) => {
        await axios.delete(`${URL}${id}`)
        getCategories()
    }

    return (
        <div className="card border-0 shadow-sm">
            <div className="table-responsive">
                <Table className="table table-hover mb-0">
                    <thead>
                        <tr className="table-header-gradient text-white">
                            <th className="text-center py-3 border-end">ID</th>
                            <th className="text-center py-3 border-end">CATEGORIA</th>
                            <th className="text-center py-3 border-end">DESCRIPCION</th>
                            <th className="text-center py-3 border-end">ESTADO</th>
                            <th className="text-center py-3 border-end">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td className="text-center align-middle border-end">{category.idCategoria}</td>
                                <td className="text-center align-middle border-end">{category.nombreCategoria}</td>
                                <td className="text-center align-middle border-end">{category.descripcionCategoria}</td>
                                <td className="text-center align-middle border-end">
                                    <span className={`badge d-inline-flex rounded-pill px-4 py-1.5 text-xs font-semibold justify-center align-items-center ${category.estado === 1
                                        ? "bg-success text-light border border-success"
                                        : "bg-danger text-light border border-danger"
                                        }`}>
                                        {category.estado}
                                    </span>
                                </td>

                                <td className="text-center align-middle border-end">
                                    <Button className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Button>
                                    <button onClick={() => deleteCategory(category.id)} className="btn btn-danger"><i className="fa-solid fa-eraser"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )

}

export default CompShowCategories