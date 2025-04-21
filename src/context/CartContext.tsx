
import * as React from 'react';
import { Product } from '../data/products';
import { toast } from '../components/ui/sonner';

export interface CartItem {
  product: Product;
  quantity: number;
  isRental: boolean;
  size?: string;
  color?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, isRental: boolean, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string, isRental: boolean) => void;
  updateQuantity: (productId: string, isRental: boolean, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = React.useState<CartItem[]>([]);

  const addToCart = (product: Product, isRental: boolean, quantity = 1, size?: string, color?: string) => {
    setCart(prevCart => {
      // Check if item already exists with same rental status, size and color
      const existingItemIndex = prevCart.findIndex(
        item => item.product.id === product.id && 
               item.isRental === isRental &&
               item.size === size &&
               item.color === color
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        toast.success(`Updated quantity in cart`);
        return updatedCart;
      } else {
        // Add new item
        toast.success(`Added to cart`);
        return [...prevCart, { product, quantity, isRental, size, color }];
      }
    });
  };

  const removeFromCart = (productId: string, isRental: boolean) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.product.id === productId && item.isRental === isRental)
    ));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId: string, isRental: boolean, quantity: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId && item.isRental === isRental) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.isRental 
        ? item.product.rentPrice 
        : item.product.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
