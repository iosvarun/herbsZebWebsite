"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, products } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountPercent: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartMrpTotal: number;
  cartTotalSavings: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const getCartItemCalculations = (productId: string, quantity: number, defaultPrice: number, mrp: number) => {
  if (productId === "pain-x-oil") {
    let discountPercent = 30;
    if (quantity === 2) {
      discountPercent = 35;
    } else if (quantity >= 3) {
      discountPercent = 40;
    }
    const unitPrice = mrp * (1 - discountPercent / 100);
    return {
      unitPrice,
      totalPrice: unitPrice * quantity,
      discountPercent
    };
  }

  // Standard items
  const discountPercent = mrp > defaultPrice ? Math.round(((mrp - defaultPrice) / mrp) * 100) : 0;
  return {
    unitPrice: defaultPrice,
    totalPrice: defaultPrice * quantity,
    discountPercent
  };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("herbszen_cart");
      if (stored) {
        const parsed = JSON.parse(stored) as { productId: string; quantity: number }[];
        
        // Map back to Products structure with fresh data
        const hydratedItems = parsed
          .map((item) => {
            const prod = products.find((p) => p.id === item.productId);
            if (!prod) return null;
            const calcs = getCartItemCalculations(prod.id, item.quantity, prod.price, prod.mrp);
            return {
              product: prod,
              quantity: item.quantity,
              unitPrice: calcs.unitPrice,
              totalPrice: calcs.totalPrice,
              discountPercent: calcs.discountPercent
            };
          })
          .filter((item): item is CartItem => item !== null);
          
        setCartItems(hydratedItems);
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  // Save cart to local storage whenever items change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      const itemsToStore = cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity
      }));
      localStorage.setItem("herbszen_cart", JSON.stringify(itemsToStore));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((item) => item.product.id === product.id);
      
      let newItems = [...prevItems];
      if (existingIdx > -1) {
        const newQty = prevItems[existingIdx].quantity + quantity;
        const calcs = getCartItemCalculations(product.id, newQty, product.price, product.mrp);
        newItems[existingIdx] = {
          ...prevItems[existingIdx],
          quantity: newQty,
          unitPrice: calcs.unitPrice,
          totalPrice: calcs.totalPrice,
          discountPercent: calcs.discountPercent
        };
      } else {
        const calcs = getCartItemCalculations(product.id, quantity, product.price, product.mrp);
        newItems.push({
          product,
          quantity,
          unitPrice: calcs.unitPrice,
          totalPrice: calcs.totalPrice,
          discountPercent: calcs.discountPercent
        });
      }
      return newItems;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id !== productId) return item;
        const calcs = getCartItemCalculations(productId, quantity, item.product.price, item.product.mrp);
        return {
          ...item,
          quantity,
          unitPrice: calcs.unitPrice,
          totalPrice: calcs.totalPrice,
          discountPercent: calcs.discountPercent
        };
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Helper stats
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartMrpTotal = cartItems.reduce((sum, item) => sum + (item.product.mrp * item.quantity), 0);
  const cartTotalSavings = cartMrpTotal - cartSubtotal;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartMrpTotal,
        cartTotalSavings,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
