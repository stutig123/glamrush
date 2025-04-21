
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter your address");
      return;
    }
    if (!formData.city.trim()) {
      toast.error("Please enter your city");
      return;
    }
    if (!formData.state) {
      toast.error("Please select your state");
      return;
    }
    if (!formData.pincode.trim()) {
      toast.error("Please enter your PIN code");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      navigate('/order-success');
    }, 1500);
  };
  
  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="border rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.isRental}-${item.size}-${item.color}`} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.isRental ? 'Rental' : 'Purchase'} - Qty: {item.quantity}
                        {item.size && `, Size: ${item.size}`}
                        {item.color && `, Color: ${item.color}`}
                      </p>
                    </div>
                    <p className="font-medium">
                      ₹{item.isRental 
                        ? (item.product.rentPrice * 80).toFixed(0)
                        : (item.product.price * 80).toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{(getCartTotal() * 80).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shipping and Payment Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="fullName" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      required 
                      type="tel" 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
                    <Select 
                      value={formData.state} 
                      onValueChange={(value) => handleSelectChange('state', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                        <SelectItem value="telangana">Telangana</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="pincode">PIN Code <span className="text-red-500">*</span></Label>
                    <Input 
                      id="pincode" 
                      name="pincode" 
                      value={formData.pincode} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  
                  <RadioGroup 
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi">UPI</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-8" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : `Place Order - ₹${(getCartTotal() * 80).toFixed(0)}`}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
