import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProduct from './Pages/CrateProduct';
import EditProduct from './Pages/EditProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
