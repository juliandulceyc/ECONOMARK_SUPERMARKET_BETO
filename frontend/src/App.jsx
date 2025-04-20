import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import CompShowProducts from './components/showProducts'
import './App.css'
import CompShowUsers from './components/showUsers'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ForgotPassword from './components/recuperarContraseña/ForgotPassword'
import ResetPassword from './components/recuperarContraseña/ResetPassword'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/home/tablas/' element={<CompShowProducts />} />
        <Route path='/home/admin/usuarios/' element={<CompShowUsers />} />
        <Route path='/recuperarContraseña' element={<ForgotPassword />} />
        <Route path='/resetContraseña/:token' element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
