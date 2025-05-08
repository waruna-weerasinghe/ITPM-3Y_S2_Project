import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product) => {
        setCartItems(prev => [...prev, product]);
        setIsCartOpen(true);
    };

    const removeFromCart = (index) => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
    };

    const toggleCart = () => setIsCartOpen(prev => !prev);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCartOpen, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
};
