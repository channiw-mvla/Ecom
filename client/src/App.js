import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetail/ProductDetail';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct'
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/edit/:id' element={<UpdateProduct />} />
        <Route path='/products/:id/:size' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
