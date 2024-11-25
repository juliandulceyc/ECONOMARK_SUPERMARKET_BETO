import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [values, setValues] = useState({
    rol: '',
    username: '',
    password: ''
  })
  
  const navigate = useNavigate()

  const handleChanges = (e) => {
    setValues({...values, [e.target.name]:e.target.value})
  }

  const handleSumbit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/auth/register', values)
      if(response.status === 201 ){
        navigate('/Login')
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-white vh-100 '>
      <div className='bg-white p-3 rounded-0 w-25 border'>
        <h2 className='mb-3'>Registro</h2>
        <form onSubmit={handleSumbit}>
          <div>
            <label htmlFor='rol'>Rol</label>
            <input type='text'placeholder='Ingrese su rol' className='form-control rounded-0 mb-3' name='rol' onChange={handleChanges}/>
          </div>
          <div className=''>
            <label htmlFor='username' className=''>Usuario</label>
            <input type='text'placeholder='Ingrese su usuario' className='form-control rounded-0 mb-3' name='username' onChange={handleChanges}/>
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700'>Password</label>
            <input type='password'placeholder='Ingrese su contraseña' className='form-control rounded-0' name='password' onChange={handleChanges}/>
          </div>
          <button className='btn btn-success w-100 rounded-0'>Registrar</button>
        </form>
        <div>
          <span>¿Ya esta registrado? </span>
          <Link to='/login' className='text-blue-500'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
