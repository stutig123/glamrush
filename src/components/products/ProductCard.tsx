
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  // Convert prices to rupees (assuming 80 INR to 1 USD conversion)
  const buyPrice = (product.price * 80).toFixed(0);
  const rentPrice = (product.rentPrice * 80).toFixed(0);

  const handleAddToCart = (e: React.MouseEvent, isRental: boolean) => {
    e.preventDefault();
    addToCart(product, isRental, 1);
    toast.success(`Added to cart: ${product.name}`);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-glamrush-accent">
            {product.name}
          </h3>
          
          <div className="mt-2 flex justify-between items-center">
            <div>
              <p className="text-base font-semibold text-gray-900">₹{buyPrice}</p>
              <p className="text-xs text-gray-500">Rent: ₹{rentPrice}/day</p>
            </div>
          </div>
        </div>
      </Link>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 transition-all transform translate-y-full group-hover:translate-y-0">
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={(e) => handleAddToCart(e, false)}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Buy
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={(e) => handleAddToCart(e, true)}
          >
            Rent
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
