import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URL = 'http://localhost:3000/tablas/'

const CompShowProducts = () => {
    const [products, setproducts] = useState ([])
    useEffect( ()=>{
        getProducts()
    },[])

    //procedimiento para mostar todos los productos
    const getProducts = async () => {
        const response = await axios.get(URL)
        setproducts(response.data)
    }

    //procedimiento para eliminar un producto
    const deleteProduct = async (id) => {
        await axios.delete(`${URL}${id}`)
        getProducts()
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <Link to='/tablas/crear/' className="btn btn-primary mt-2 mb-2 w-100"><i className="fa-regular fa-square-plus"></i></Link>
                    <table className="table">
                        <thead className="table-primary">
                            <tr>
                                <th>Articulo</th>
                                <th>Categoria</th>
                                <th>Precio</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            { products.map ( (product) => (
                                <tr key={ product.id }>
                                    <td>{ product.nombre }</td>
                                    <td>{ product.categoria }</td>
                                    <td>{ product.precio }</td>
                                    <td>
                                        <Link to={`/tablas/editar/${product.id}`} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link>
                                        <button onClick={ ()=>deleteProduct(product.id) } className="btn btn-danger"><i className="fa-solid fa-eraser"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}   

export default CompShowProducts