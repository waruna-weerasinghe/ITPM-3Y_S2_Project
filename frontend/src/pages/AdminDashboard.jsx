import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'men',
    brand: '',
    sizes: [],
    colors: [],
    trending: false,
    coverImage: '',
    oldPrice: '',
    newPrice: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tempSize, setTempSize] = useState('');
  const [tempColor, setTempColor] = useState('');
  const formRef = useRef(null); // 👈 ref to scroll to form

  const categories = ['men', 'women', 'kids'];
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2T', '3T', '4T', '5T', '6T', '7T', '6', '7', '8', '9', '10', '11', '12'];
  const allColors = ['Black', 'White', 'Gray', 'Blue', 'Red', 'Yellow', 'Pink', 'Green', 'Navy', 'Purple', 'Beige', 'Khaki', 'Olive', 'Floral'];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/clothes.json');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddSize = () => {
    if (tempSize && !formData.sizes.includes(tempSize)) {
      setFormData(prev => ({ ...prev, sizes: [...prev.sizes, tempSize] }));
      setTempSize('');
    }
  };

  const handleRemoveSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(s => s !== size)
    }));
  };

  const handleAddColor = () => {
    if (tempColor && !formData.colors.includes(tempColor)) {
      setFormData(prev => ({ ...prev, colors: [...prev.colors, tempColor] }));
      setTempColor('');
    }
  };

  const handleRemoveColor = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId) {
        setProducts(products.map(p =>
          p._id === editingId ? { ...formData, _id: editingId } : p
        ));
        setEditingId(null);
      } else {
        const newId = products.length ? Math.max(...products.map(p => p._id || 0)) + 1 : 1;
        setProducts([...products, { ...formData, _id: newId }]);
      }

      setFormData({
        title: '',
        description: '',
        category: 'men',
        brand: '',
        sizes: [],
        colors: [],
        trending: false,
        coverImage: '',
        oldPrice: '',
        newPrice: ''
      });
    } catch (err) {
      setError('Failed to save product');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({ ...product });
    setEditingId(product._id);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product._id !== id));
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🛍️ Admin Dashboard</h1>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Product Form */}
      <div ref={formRef} className="bg-white p-6 rounded-xl shadow-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Product Title" className="border p-3 rounded w-full" required />
            <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="border p-3 rounded w-full" required />
            <select name="category" value={formData.category} onChange={handleChange} className="border p-3 rounded w-full">
              {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
            <div className="flex gap-4">
              <input type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange} placeholder="Old Price" className="border p-3 rounded w-full" required />
              <input type="number" name="newPrice" value={formData.newPrice} onChange={handleChange} placeholder="New Price" className="border p-3 rounded w-full" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Sizes</label>
              <div className="flex">
                <select value={tempSize} onChange={(e) => setTempSize(e.target.value)} className="flex-1 border rounded px-3 py-2 mr-2">
                  <option value="">Select Size</option>
                  {allSizes.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
                <button type="button" onClick={handleAddSize} className="bg-blue-500 text-white px-3 py-2 rounded">Add</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.sizes.map(size => (
                  <span key={size} className="bg-gray-100 px-2 py-1 rounded flex items-center">
                    {size}
                    <button onClick={() => handleRemoveSize(size)} className="ml-1 text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Colors</label>
              <div className="flex">
                <select value={tempColor} onChange={(e) => setTempColor(e.target.value)} className="flex-1 border rounded px-3 py-2 mr-2">
                  <option value="">Select Color</option>
                  {allColors.map(color => <option key={color} value={color}>{color}</option>)}
                </select>
                <button type="button" onClick={handleAddColor} className="bg-blue-500 text-white px-3 py-2 rounded">Add</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.colors.map(color => (
                  <span key={color} className="bg-gray-100 px-2 py-1 rounded flex items-center">
                    {color}
                    <button onClick={() => handleRemoveColor(color)} className="ml-1 text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>
            <input name="coverImage" value={formData.coverImage} onChange={handleChange} placeholder="Cover Image URL" className="border p-3 rounded w-full" required />
            {formData.coverImage && <img src={formData.coverImage} alt="Preview" className="w-24 h-24 object-cover rounded border" />}
            <div className="flex items-center">
              <input type="checkbox" name="trending" checked={formData.trending} onChange={handleChange} className="mr-2" />
              <label className="text-gray-700">Trending Product</label>
            </div>
          </div>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Product Description" className="border p-3 rounded w-full" rows="4" required />
          <div className="flex gap-4">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow">
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
            {editingId && (
              <button type="button" onClick={() => {
                setEditingId(null);
                setFormData({
                  title: '', description: '', category: 'men', brand: '', sizes: [], colors: [],
                  trending: false, coverImage: '', oldPrice: '', newPrice: ''
                });
              }} className="bg-gray-500 text-white px-6 py-2 rounded shadow">Cancel</button>
            )}
          </div>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Product List ({products.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Image</th>
                <th className="p-3">Title & Desc</th>
                <th className="p-3">Category</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Price</th>
                <th className="p-3">Trending</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-t">
                  <td className="p-3"><img src={product.coverImage} alt={product.title} className="w-16 h-16 rounded object-cover" /></td>
                  <td className="p-3">
                    <div className="font-medium">{product.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-2">{product.description}</div>
                  </td>
                  <td className="p-3 capitalize">{product.category}</td>
                  <td className="p-3">{product.brand}</td>
                  <td className="p-3">
                    <div className="text-gray-400 line-through">${product.oldPrice}</div>
                    <div className="font-bold text-green-600">${product.newPrice}</div>
                  </td>
                  <td className="p-3">
                    {product.trending ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Trending</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Regular</span>
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => handleEdit(product)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan="7" className="p-3 text-center text-gray-500">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

