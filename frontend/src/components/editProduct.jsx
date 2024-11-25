import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URL = 'http://localhost:3000/tablas/'

const CompEditProduct = () => {
    const [nombre, setNombre] = useState('')
    const [categoria, setCategoria] = useState('')
    const [precio, setPrecio] = useState('')

    const navigate = useNavigate()
    const {id} = useParams()

    //Procedimiento para actualizar
    const update = async (e) => {
        e.preventDefault()
        await axios.put(URL+id, {
            nombre: nombre, 
            categoria: categoria,
            precio: precio
        })
        navigate('/tablas')
    }

    useEffect( ()=>{
        getProductById()
    },[])

    const getProductById = async () => {
        const response = await axios.get(URL+id)
        setNombre(response.data.nombre)
        setCategoria(response.data.categoria)
        setPrecio(response.data.precio)
    }

    return (
        <div>
            <h3>EDIT</h3>
            <form onSubmit={update}>
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

export default CompEditProduct