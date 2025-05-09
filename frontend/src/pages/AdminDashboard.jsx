 import React, { useState, useEffect, useRef } from 'react';

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
  const [success, setSuccess] = useState('');
  const [tempSize, setTempSize] = useState('');
  const [tempColor, setTempColor] = useState('');
  const formRef = useRef(null);

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

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

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

  const validateForm = () => {
    const { title, description, brand, coverImage, oldPrice, newPrice } = formData;
    if (!title || !description || !brand || !coverImage || !oldPrice || !newPrice) {
      setError('All fields are required, including the cover image.');
      return false;
    }
    if (isNaN(oldPrice) || isNaN(newPrice) || Number(oldPrice) <= 0 || Number(newPrice) <= 0) {
      setError('Old price and new price must be valid positive numbers.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (editingId) {
        setProducts(products.map(p =>
          p._id === editingId ? { ...formData, _id: editingId } : p
        ));
        showSuccess('Product updated successfully!');
        setEditingId(null);
      } else {
        const newId = products.length ? Math.max(...products.map(p => p._id || 0)) + 1 : 1;
        setProducts([...products, { ...formData, _id: newId }]);
        showSuccess('Product added successfully!');
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
      showSuccess('Product deleted successfully!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-slate-50 min-h-screen font-sans text-zinc-800">
      <h1 className="text-5xl font-extrabold mb-10 text-slate-800 tracking-tight">🛍️ Admin Dashboard</h1>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded mb-6">
          {success}
        </div>
      )}

      {/* FORM */}
      <div ref={formRef} className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-slate-700">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Product Title" className="border border-gray-300 p-3 rounded-lg w-full" required />
            <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="border border-gray-300 p-3 rounded-lg w-full" required />
            <select name="category" value={formData.category} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg w-full">
              {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
            <div className="flex gap-4">
              <input type="number" name="oldPrice" value={formData.oldPrice} onChange={handleChange} placeholder="Old Price" className="border p-3 rounded-lg w-full" required />
              <input type="number" name="newPrice" value={formData.newPrice} onChange={handleChange} placeholder="New Price" className="border p-3 rounded-lg w-full" required />
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Sizes</label>
              <div className="flex">
                <select value={tempSize} onChange={(e) => setTempSize(e.target.value)} className="flex-1 border rounded-lg px-3 py-2 mr-2">
                  <option value="">Select Size</option>
                  {allSizes.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
                <button type="button" onClick={handleAddSize} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">Add</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.sizes.map(size => (
                  <span key={size} className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center">
                    {size}
                    <button onClick={() => handleRemoveSize(size)} className="ml-1 text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Colors</label>
              <div className="flex">
                <select value={tempColor} onChange={(e) => setTempColor(e.target.value)} className="flex-1 border rounded-lg px-3 py-2 mr-2">
                  <option value="">Select Color</option>
                  {allColors.map(color => <option key={color} value={color}>{color}</option>)}
                </select>
                <button type="button" onClick={handleAddColor} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">Add</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.colors.map(color => (
                  <span key={color} className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center">
                    {color}
                    <button onClick={() => handleRemoveColor(color)} className="ml-1 text-red-500">×</button>
                  </span>
                ))}
              </div>
            </div>

            <input name="coverImage" value={formData.coverImage} onChange={handleChange} placeholder="Cover Image URL" className="border p-3 rounded-lg w-full" required />
            {formData.coverImage && <img src={formData.coverImage} alt="Preview" className="w-24 h-24 object-cover rounded-lg border" />}
            <div className="flex items-center">
              <input type="checkbox" name="trending" checked={formData.trending} onChange={handleChange} className="mr-2" />
              <label className="text-sm text-gray-700">Trending Product</label>
            </div>
          </div>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Product Description" className="border p-3 rounded-lg w-full" rows="4" required />
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium">
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
            {editingId && (
              <button type="button" onClick={() => {
                setEditingId(null);
                setFormData({
                  title: '', description: '', category: 'men', brand: '', sizes: [], colors: [], trending: false, coverImage: '', oldPrice: '', newPrice: ''
                });
              }} className="bg-gray-500 text-white px-6 py-2 rounded-xl">Cancel</button>
            )}
          </div>
        </form>
      </div>

      {/* Product Table */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-3xl font-semibold mb-6 text-slate-700">Product List ({products.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-slate-500 uppercase text-xs tracking-wider">
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
                <tr key={product._id} className="bg-slate-50 hover:bg-slate-100 rounded-xl transition-shadow shadow-sm">
                  <td className="p-3"><img src={product.coverImage} alt={product.title} className="w-16 h-16 rounded-lg object-cover" /></td>
                  <td className="p-3">
                    <div className="font-semibold">{product.title}</div>
                    <div className="text-slate-500 text-xs line-clamp-2">{product.description}</div>
                  </td>
                  <td className="p-3 capitalize">{product.category}</td>
                  <td className="p-3">{product.brand}</td>
                  <td className="p-3">
                    <div className="text-gray-400 line-through">${product.oldPrice}</div>
                    <div className="font-bold text-emerald-600">${product.newPrice}</div>
                  </td>
                  <td className="p-3">
                    {product.trending ? (
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">Trending</span>
                    ) : (
                      <span className="bg-slate-200 text-slate-800 px-2 py-1 rounded-full text-xs font-medium">Regular</span>
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => handleEdit(product)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">Delete</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan="7" className="p-3 text-center text-slate-400">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
