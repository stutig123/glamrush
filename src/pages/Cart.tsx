
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ShoppingBag, X, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [isReturnDialogOpen, setIsReturnDialogOpen] = React.useState(false);
  const [selectedRentalItem, setSelectedRentalItem] = React.useState<string | null>(null);
  
  const handleReturnRequest = (productId: string) => {
    setSelectedRentalItem(productId);
    setIsReturnDialogOpen(true);
  };
  
  const handleReturnSubmit = () => {
    if (selectedRentalItem) {
      removeFromCart(selectedRentalItem, true);
    }
    setIsReturnDialogOpen(false);
    setSelectedRentalItem(null);
  };
  
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };
  
  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mb-6">
            <ShoppingBag size={64} className="mx-auto text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              {/* Cart Header */}
              <div className="grid grid-cols-12 gap-2 p-4 bg-gray-50 border-b">
                <div className="col-span-6 font-medium">Product</div>
                <div className="col-span-2 font-medium text-center">Price</div>
                <div className="col-span-2 font-medium text-center">Quantity</div>
                <div className="col-span-2 font-medium text-right">Total</div>
              </div>
              
              {/* Cart Items */}
              <div className="divide-y">
                {cart.map((item) => {
                  const itemPrice = item.isRental 
                    ? (item.product.rentPrice * 80).toFixed(0) 
                    : (item.product.price * 80).toFixed(0);
                  
                  const itemTotal = (parseFloat(itemPrice) * item.quantity).toFixed(0);
                  
                  return (
                    <div key={`${item.product.id}-${item.isRental}-${item.size}-${item.color}`} className="grid grid-cols-12 gap-2 p-4 items-center">
                      {/* Product */}
                      <div className="col-span-6 flex gap-3">
                        <div className="h-20 w-20 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            <Link to={`/product/${item.product.id}`} className="hover:underline">
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.isRental ? 'Rental' : 'Purchase'}
                            {item.size && `, Size: ${item.size}`}
                            {item.color && `, Color: ${item.color}`}
                          </p>
                          
                          <div className="flex space-x-2 mt-2">
                            <button 
                              onClick={() => removeFromCart(item.product.id, item.isRental)}
                              className="text-xs text-red-600 hover:underline flex items-center"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </button>
                            
                            {item.isRental && (
                              <button 
                                onClick={() => handleReturnRequest(item.product.id)}
                                className="text-xs text-blue-600 hover:underline"
                              >
                                Request Return
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-2 text-center">
                        <span>₹{itemPrice}</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.isRental, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center border rounded-l"
                          >
                            -
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center border-t border-b">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.isRental, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="col-span-2 text-right">
                        <span className="font-medium">₹{itemTotal}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{(getCartTotal() * 80).toFixed(0)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹0</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{(getCartTotal() * 80).toFixed(0)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleProceedToCheckout} 
                  className="w-full mt-4" 
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Return Request Dialog */}
      <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Return</DialogTitle>
            <DialogDescription>
              Please confirm that you want to return this rental item.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 mb-6">
              Our team will contact you to arrange the return pickup within 24 hours.
            </p>
            
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsReturnDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReturnSubmit}>
                Confirm Return
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Cart;
