
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const orderNumber = `GR-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-lg text-center">
        <div className="border p-8 rounded-lg shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Order Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order number is <span className="font-medium">{orderNumber}</span>.
          </p>
          <p className="text-gray-600 mb-8">
            An email with your order details has been sent to your email address.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/shop')}
              className="w-full"
            >
              Continue Shopping
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;
