 import React, { useState } from 'react';

const Footer = () => {
  const [activePopup, setActivePopup] = useState(null);

  const categories = {
    men: ['T-Shirts', 'Shirts', 'Jeans', 'Jackets', 'Accessories', 'Footwear'],
    women: ['Dresses', 'Tops', 'Skirts', 'Handbags', 'Shoes', 'Jewelry'],
    kids: ['T-Shirts', 'Shorts', 'School Wear', 'Toys', 'Sneakers'],
    newArrivals: ['Spring Collection', 'Limited Editions', 'Fresh Prints', 'Trending Now']
  };

  const handlePopupToggle = (type) => {
    setActivePopup(activePopup === type ? null : type);
  };

  return (
    <footer className="bg-black text-white pt-12 pb-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-3xl font-extrabold uppercase tracking-wide mb-3">LuxWear</h2>
            <p className="text-sm text-gray-400">Crafted for comfort. Designed for distinction.</p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {['men', 'women', 'kids', 'newArrivals'].map((type) => (
                <li key={type}>
                  <button
                    onClick={() => handlePopupToggle(type)}
                    className="hover:text-yellow-400 transition font-medium tracking-wide"
                  >
                    {type === 'newArrivals' ? 'New Arrivals' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/contact" className="hover:text-yellow-400 transition">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-yellow-400 transition">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-yellow-400 transition">Shipping & Returns</a></li>
              <li><a href="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-300 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Popup Panel */}
        {activePopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setActivePopup(null)}
            />
            <div
              className="relative z-10 bg-white/80 backdrop-blur-xl border border-gray-200 ring-1 ring-white/50 shadow-xl text-black rounded-2xl p-6 w-80 transition-all duration-300 transform scale-100 animate-fadeIn"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold tracking-wide text-gray-900">
                  {activePopup === 'newArrivals' ? 'New Arrivals' : activePopup.charAt(0).toUpperCase() + activePopup.slice(1)} Categories
                </h4>
                <button onClick={() => setActivePopup(null)} className="text-gray-600 hover:text-black text-xl">
                  ×
                </button>
              </div>
              <ul className="space-y-2">
                {categories[activePopup].map((cat, idx) => (
                  <li key={idx} className="hover:text-yellow-500 transition cursor-pointer text-base font-medium">
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} LuxWear. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social icons (left as-is) */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
