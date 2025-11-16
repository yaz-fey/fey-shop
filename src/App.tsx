import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import CartDetail from './pages/CartDetail'; // CartDetail bileşenini import et

const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartDetail />} /> {/* Yeni CartDetail rotasını ekle */}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
