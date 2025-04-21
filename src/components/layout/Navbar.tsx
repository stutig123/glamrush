import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, removeFromCart, getCartTotal, getCartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const cartCount = getCartCount();
  const cartTotal = getCartTotal().toFixed(2);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleCheckout = () => {
    navigate('/checkout');
    setIsSheetOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-glamrush">
          GlamRush
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`${isActive('/') ? 'text-glamrush-accent font-medium' : 'text-gray-700'} hover:text-glamrush-accent transition-colors`}>
            Home
          </Link>
          <Link to="/shop" className={`${isActive('/shop') ? 'text-glamrush-accent font-medium' : 'text-gray-700'} hover:text-glamrush-accent transition-colors`}>
            Shop
          </Link>
          <Link to="/my-orders" className={`${isActive('/my-orders') ? 'text-glamrush-accent font-medium' : 'text-gray-700'} hover:text-glamrush-accent transition-colors`}>
            My Orders
          </Link>
          <Link to="/contact" className={`${isActive('/contact') ? 'text-glamrush-accent font-medium' : 'text-gray-700'} hover:text-glamrush-accent transition-colors`}>
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-glamrush-accent text-white">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Your Shopping Cart</SheetTitle>
              </SheetHeader>
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[70vh]">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <Link to="/shop">
                    <Button className="mt-4">Continue Shopping</Button>
                  </Link>
                </div>
              ) : (
                <div className="mt-6 flex flex-col h-full">
                  <ScrollArea className="flex-1">
                    <div className="space-y-4">
                      {cart.map((item, index) => (
                        <div key={`${item.product.id}-${item.isRental}-${index}`} className="flex items-center space-x-4">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="h-16 w-16 rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.isRental ? 'Rental' : 'Purchase'} - Qty: {item.quantity}
                            </p>
                            {item.size && <p className="text-xs">Size: {item.size}</p>}
                            {item.color && <p className="text-xs">Color: {item.color}</p>}
                            <p className="font-medium">
                              ₹{(item.isRental ? item.product.rentPrice * 80 : item.product.price * 80).toFixed(0)}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromCart(item.product.id, item.isRental)}
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-4">
                      <span>Subtotal:</span>
                      <span className="font-bold">₹{(getCartTotal() * 80).toFixed(0)}</span>
                    </div>
                    <Button className="w-full" onClick={handleCheckout}>Checkout</Button>
                    <Button 
                      variant="outline" 
                      className="w-full mt-2" 
                      onClick={() => {
                        navigate('/shop');
                        setIsSheetOpen(false);
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
          
          <Button variant="outline" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
