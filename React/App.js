import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import ShowProducts from './components/ShowProducts';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Navigate to="/login" />}></Route>
        <Route path='/components/ShowProducts' element={<ShowProducts/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
