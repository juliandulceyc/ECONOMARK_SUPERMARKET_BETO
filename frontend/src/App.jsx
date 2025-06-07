import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import ForgotPassword from './components/recuperarContraseña/ForgotPassword';
import ResetPassword from './components/recuperarContraseña/ResetPassword';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/recuperarContraseña' element={<ForgotPassword />} />
        <Route path='/resetContraseña/:token' element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
