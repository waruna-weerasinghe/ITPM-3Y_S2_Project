import React, { useState, useEffect } from 'react';
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
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, tempSize]
      }));
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
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, tempColor]
      }));
      setTempColor('');
    }
  };

  const handleRemoveColor = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (editingId) {
        setProducts(products.map(product =>
          product._id === editingId ? { ...formData, _id: editingId } : product
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
    setFormData({
      title: product.title,
      description: product.description,
      category: product.category,
      brand: product.brand,
      sizes: [...product.sizes],
      colors: [...product.colors],
      trending: product.trending,
      coverImage: product.coverImage,
      oldPrice: product.oldPrice,
      newPrice: product.newPrice
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsLoading(true);
      try {
        setProducts(products.filter(product => product._id !== id));
      } catch (err) {
        setError('Failed to delete product');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard - Clothing Products</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {/* Product Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Old Price ($)</label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex-1 ml-2">
                <label className="block text-gray-700 mb-2">New Price ($)</label>
                <input
                  type="number"
                  name="newPrice"
                  value={formData.newPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Sizes</label>
              <div className="flex">
                <select
                  value={tempSize}
                  onChange={(e) => setTempSize(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded mr-2"
                >
                  <option value="">Select Size</option>
                  {allSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.sizes.map(size => (
                  <span key={size} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                    {size}
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(size)}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Colors</label>
              <div className="flex">
                <select
                  value={tempColor}
                  onChange={(e) => setTempColor(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded mr-2"
                >
                  <option value="">Select Color</option>
                  {allColors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.colors.map(color => (
                  <span key={color} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                    {color}
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(color)}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Cover Image URL</label>
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
              {formData.coverImage && (
                <img src={formData.coverImage} alt="Preview" className="mt-2 w-20 h-20 object-cover border rounded" />
              )}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="trending"
                id="trending"
                checked={formData.trending}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="trending" className="text-gray-700">Trending Product</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows="3"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
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
              }}
              className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Product List ({products.length})</h2>
        {isLoading && !products.length ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Image</th>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Category</th>
                  <th className="py-2 px-4 border-b">Brand</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Trending</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td className="py-2 px-4 border-b">
                      <img src={product.coverImage} alt={product.title} className="w-16 h-16 object-cover" />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="font-medium">{product.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-2">{product.description}</div>
                    </td>
                    <td className="py-2 px-4 border-b capitalize">{product.category}</td>
                    <td className="py-2 px-4 border-b">{product.brand}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="text-gray-500 line-through">${product.oldPrice}</div>
                      <div className="font-bold text-green-600">${product.newPrice}</div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {product.trending ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Trending</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Regular</span>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
