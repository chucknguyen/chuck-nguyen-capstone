import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CartPage from './pages/CartPage/CartPage';
import Catalog from './pages/Catalog/Catalog';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path='/catalog' element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
