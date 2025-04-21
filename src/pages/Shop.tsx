
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CategoryFilter from '@/components/products/CategoryFilter';
import ProductCard from '@/components/products/ProductCard';
import SearchBar from '@/components/products/SearchBar';
import { getProductsByCategory, getAllProducts, Product } from '@/data/products';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  useEffect(() => {
    let products = category === 'all' ? getAllProducts() : getProductsByCategory(category);
    
    // Apply search filter if query exists
    if (searchQuery) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply size filter if selected
    if (selectedSizes.length > 0) {
      products = products.filter(product => 
        product.sizes && product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    setFilteredProducts(products);
  }, [category, searchQuery, selectedSizes]);
  
  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shop</h1>
        
        <div className="mb-6">
          <SearchBar />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-8">
            <CategoryFilter />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Size</h3>
              <div className="space-y-2">
                {availableSizes.map(size => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`size-${size}`} 
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => handleSizeToggle(size)}
                    />
                    <Label htmlFor={`size-${size}`}>{size}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
