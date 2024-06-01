// App.js
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AllProductsPage from './components/AllProductsPage.js';
// import ProductDetailPage from './components/ProductDetailPage.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<AllProductsPage/>} />
        {/* <Route path="/product/:id" element={<ProductDetailPage/>} /> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
