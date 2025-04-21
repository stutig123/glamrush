
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section relative h-[80vh] flex items-center text-white">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Unleash Your Style with GlamRush</h1>
            <p className="text-lg md:text-xl mb-8">
              Hot trends, bold looks — and lightning-fast delivery in just 2 hours. Buy or rent, the choice is yours!
            </p>
            <Link to="/shop">
              <Button size="lg" className="text-lg">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Shopping Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4">Buy</h3>
              <p className="text-gray-600 mb-6">
                Own the latest styles and add them permanently to your wardrobe. Free shipping on all orders.
              </p>
              <Link to="/shop">
                <Button>Shop to Buy</Button>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold mb-4">Rent</h3>
              <p className="text-gray-600 mb-6">
                Special occasion? Try our rental service - all the glamour at a fraction of the price.
              </p>
              <Link to="/shop">
                <Button variant="outline">Shop to Rent</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose GlamRush</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 inline-block p-4 bg-glamrush-accent bg-opacity-10 rounded-full">
                <svg className="h-8 w-8 text-glamrush-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">2-Hour Delivery</h3>
              <p className="text-gray-600">Lightning-fast delivery to your doorstep in just 2 hours.</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-block p-4 bg-glamrush-accent bg-opacity-10 rounded-full">
                <svg className="h-8 w-8 text-glamrush-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">Premium quality clothing and accessories from top brands.</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-block p-4 bg-glamrush-accent bg-opacity-10 rounded-full">
                <svg className="h-8 w-8 text-glamrush-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Style</h3>
              <p className="text-gray-600">Get recommendations that match your unique style and preferences.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
