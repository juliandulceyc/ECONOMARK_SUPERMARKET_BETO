import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = 'http://localhost:3000/tablas/'

const CompCreateProduct = () => {
    const [nombre, setNombre] = useState('')
    const [categoria, setCategoria] = useState('')
    const [precio, setPrecio] = useState('')

    const navigate = useNavigate()

    //Procedimiento guardar
    const store = async (e) => {
        e.preventDefault()
        await axios.post(URL, {nombre: nombre, categoria: categoria, precio: precio})
        navigate('/tablas/')
    }

    return (
        <div>
            <h3>CREATE</h3>
            <form onSubmit={store}>
                <div className="mb-3 text-center">
                    <label className="form-label">Articulo</label>
                    <input 
                        value={nombre}
                        onChange={ (e) => setNombre (e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className="mb-3 text-center">
                    <label className="form-label">Categoria</label>
                    <input 
                        value={categoria}
                        onChange={ (e) => setCategoria (e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className="mb-3 text-center">
                    <label className="form-label">Precio</label>
                    <input 
                        value={precio}
                        onChange={ (e) => setPrecio (e.target.value)}
                        type='number'
                        className='form-control'
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100"><i className="fa-solid fa-plus"></i></button>
            </form>
        </div>
    )
}

export default CompCreateProduct