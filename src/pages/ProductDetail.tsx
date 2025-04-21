
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag } from 'lucide-react';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getProductById(id || '');
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [selectedOption, setSelectedOption] = useState<'buy' | 'rent'>('buy');
  const [rentalDays, setRentalDays] = useState(1);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </Layout>
    );
  }
  
  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    addToCart(
      product, 
      selectedOption === 'rent',
      quantity,
      selectedSize,
      selectedColor
    );
    
    toast.success(`Added to cart: ${product.name}`);
  };
  
  // Convert prices to rupees (assuming 80 INR to 1 USD conversion)
  const buyPrice = (product.price * 80).toFixed(0);
  const dailyRentPrice = (product.rentPrice * 80).toFixed(0);
  const totalRentPrice = (product.rentPrice * rentalDays * 80).toFixed(0);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-4">
              <Tabs defaultValue="buy" onValueChange={(val) => setSelectedOption(val as 'buy' | 'rent')}>
                <TabsList className="mb-4">
                  <TabsTrigger value="buy">
                    Buy for ₹{buyPrice}
                  </TabsTrigger>
                  <TabsTrigger value="rent">
                    Rent from ₹{dailyRentPrice}/day
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="buy">
                  <p className="text-sm text-gray-500 mb-4">
                    Purchase this item and own it forever. Free shipping on all purchases over ₹4,000.
                  </p>
                </TabsContent>
                
                <TabsContent value="rent">
                  <p className="text-sm text-gray-500 mb-4">
                    Rent for your desired duration and return using our free shipping label.
                  </p>
                  
                  {/* Rental Duration Selection */}
                  <div className="mb-6">
                    <Label htmlFor="rental-duration" className="block mb-2">
                      Rental Duration
                    </Label>
                    <div className="flex items-center gap-4">
                      <Select 
                        value={rentalDays.toString()} 
                        onValueChange={(value) => setRentalDays(parseInt(value))}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day</SelectItem>
                          <SelectItem value="3">3 days</SelectItem>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-lg font-medium">
                        ₹{totalRentPrice}
                      </span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Size <span className="text-red-500">*</span></h3>
                <RadioGroup 
                  value={selectedSize} 
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {product.sizes.map((size) => (
                    <div key={size} className="flex items-center">
                      <RadioGroupItem 
                        value={size} 
                        id={`size-${size}`} 
                        className="peer hidden"
                      />
                      <Label 
                        htmlFor={`size-${size}`}
                        className="min-w-[3rem] px-3 py-2 border rounded-md text-center cursor-pointer peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Color</h3>
                <RadioGroup 
                  value={selectedColor} 
                  onValueChange={setSelectedColor}
                  className="flex flex-wrap gap-2"
                >
                  {product.colors.map((color) => (
                    <div key={color} className="flex items-center">
                      <RadioGroupItem 
                        value={color} 
                        id={`color-${color}`} 
                        className="peer hidden"
                      />
                      <Label 
                        htmlFor={`color-${color}`}
                        className="min-w-[5rem] px-3 py-2 border rounded-md text-center cursor-pointer peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1 border rounded-l-md"
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-1 border rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="mt-8 flex gap-4">
              <Button 
                size="lg" 
                className="flex-1" 
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  if (product.sizes && product.sizes.length > 0 && !selectedSize) {
                    toast.error("Please select a size");
                    return;
                  }
                  handleAddToCart();
                  navigate('/cart');
                }}
              >
                Buy Now
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="mt-6">
              <div className="border-t pt-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free shipping on orders over ₹4,000</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>2-hour delivery available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
