import React, { createContext, useState, useEffect, useMemo } from 'react';

export const CartContext = createContext(null);

const STORAGE_KEY = 'crumb_bloom_cart_v1';
const PACKAGING_FEE = 1.5; // Porchside eco-linen packaging & locker allocation fee

export function CartProvider({ children }) {
  // Initialize cart state from localStorage if available
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Drawer slide-over visibility state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Unable to persist cart to localStorage', e);
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Add item to cart (or update quantity if already present)
  const addToCart = (product, quantityToAdd = 1) => {
    if (!product || !product.available || product.remainingAllotment <= 0) {
      return false;
    }

    setItems((currentItems) => {
      const existingIndex = currentItems.findIndex((item) => item.id === product.id);
      const maxAllotment = product.remainingAllotment || 99;

      if (existingIndex > -1) {
        const updated = [...currentItems];
        const currentQty = updated[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantityToAdd, maxAllotment);

        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          remainingAllotment: maxAllotment,
        };
        return updated;
      } else {
        const initialQty = Math.min(Math.max(1, quantityToAdd), maxAllotment);
        return [
          ...currentItems,
          {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            weight: product.weight || '',
            category: product.categoryLabel || product.category || '',
            imageUrl: product.imageUrl || '',
            remainingAllotment: maxAllotment,
            quantity: initialQty,
          },
        ];
      }
    });

    return true;
  };

  // Update specific item quantity directly
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === productId) {
          const clampedQty = Math.min(newQuantity, item.remainingAllotment || 99);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  // Remove item completely
  const removeFromCart = (productId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  };

  // Clear all items
  const clearCart = () => {
    setItems([]);
  };

  // Computed metrics
  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const packagingFee = useMemo(() => {
    return items.length > 0 ? PACKAGING_FEE : 0.0;
  }, [items]);

  const total = useMemo(() => {
    return subtotal + packagingFee;
  }, [subtotal, packagingFee]);

  const contextValue = {
    items,
    itemCount,
    subtotal,
    packagingFee,
    total,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
