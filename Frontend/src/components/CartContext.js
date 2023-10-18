
import React, { createContext, useContext, useState } from 'react';

// Create a new context for the shopping cart
const CartContext = createContext();

// Create a custom hook to access the CartContext
export const useCart = () => useContext(CartContext);

// Create a CartProvider component to wrap your application with
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Initialize an empty shopping cart



  
    const addToCart = (item) => {

      setCart([...cart, item]);
    };
    


  // Provide the cart data and functions to the context
  const contextValue = {
    cart,
    addToCart,

  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
