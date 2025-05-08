import React, { useState, useEffect } from 'react';
import AdminDashboard from '../../AdminDashboard';
import ClothesCard from '../../../home/clothes/ClothesCard';

const ClothesManager = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/clothes.json'); // adjust if you're using an API
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <AdminDashboard products={products} setProducts={setProducts} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {products.map((product) => (
          <ClothesCard key={product._id} clothe={product} />
        ))}
      </div>
    </div>
  );
};

export default ClothesManager;
