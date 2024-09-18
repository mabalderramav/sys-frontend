import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
const App: React.FC = () => {
  return (
    <Router>
      <div className="p-8">
        {/* Navigation Links */}
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-500 hover:underline">
                New Product
              </Link>
            </li>
            <li>
              <Link to="/list" className="text-blue-500 hover:underline">
                Product List
              </Link>
            </li>
          </ul>
        </nav>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<ProductForm />} />
          <Route path="/list" element={<ProductList />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
