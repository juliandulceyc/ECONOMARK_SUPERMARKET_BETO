import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import CompShowProducts from './components/showProducts'
import CompCreateProduct from './components/createProduct'
import CompEditProduct from './components/editProduct'
import './App.css'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/tablas' element={<CompShowProducts/>}/>
        <Route path='/tablas/crear/' element={<CompCreateProduct/>}/>
        <Route path='/tablas/editar/:id' element={<CompEditProduct/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
