import React from 'react';
import { useCart } from './CartContext';

const CartSidebar = () => {
    const { cartItems, removeFromCart, isCartOpen, toggleCart } = useCart();

    return (
        <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">Your Cart</h2>
                <button onClick={toggleCart} className="text-gray-500 hover:text-black">✕</button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[80vh] space-y-4">
                {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-sm">Your cart is empty.</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="flex gap-4 items-center border-b pb-3">
                            <img src={item.coverImage} alt={item.title} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-500">${item.newPrice}</p>
                            </div>
                            <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700">🗑</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
