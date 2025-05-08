 // src/context/ProductContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/clothes.json'); // adjust path if needed
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
