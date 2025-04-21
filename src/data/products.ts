
export interface Product {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'jackets' | 'jewelry' | 'shoes';
  price: number;
  rentPrice: number;
  image: string;
  description: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    category: "tops",
    price: 29.99,
    rentPrice: 5.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500",
    description: "A timeless white t-shirt that goes with everything. Made from 100% organic cotton for maximum comfort.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    inStock: true,
    isFeatured: true
  },
  {
    id: "2",
    name: "High-Waist Slim Jeans",
    category: "bottoms",
    price: 59.99,
    rentPrice: 12.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500",
    description: "Flattering high-waisted jeans with a slim fit through the hip and thigh. Sustainably produced denim.",
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    colors: ["Blue", "Black", "Light Wash"],
    inStock: true,
    isFeatured: true
  },
  {
    id: "3",
    name: "Floral Summer Dress",
    category: "dresses",
    price: 79.99,
    rentPrice: 15.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500",
    description: "A beautiful floral dress perfect for summer days and special occasions. Features an adjustable waist tie.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Floral Print"],
    inStock: true,
    isFeatured: true
  },
  {
    id: "4",
    name: "Leather Biker Jacket",
    category: "jackets",
    price: 199.99,
    rentPrice: 39.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500",
    description: "Classic biker jacket in genuine leather. Features asymmetric zip fastening and multiple pockets.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    inStock: true
  },
  {
    id: "5",
    name: "Crystal Statement Necklace",
    category: "jewelry",
    price: 49.99,
    rentPrice: 9.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=500",
    description: "Eye-catching statement necklace with crystal pendants. Perfect for adding glamour to any outfit.",
    inStock: true,
    isFeatured: true
  },
  {
    id: "6",
    name: "Leather Ankle Boots",
    category: "shoes",
    price: 129.99,
    rentPrice: 25.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=500",
    description: "Versatile ankle boots in genuine leather. Features a small heel and side zipper for easy wear.",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Black", "Brown", "Tan"],
    inStock: true
  },
  {
    id: "7",
    name: "Oversized Knit Sweater",
    category: "tops",
    price: 69.99,
    rentPrice: 14.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500",
    description: "Cozy oversized sweater in a chunky knit. Perfect for layering during colder months.",
    sizes: ["S/M", "L/XL"],
    colors: ["Cream", "Gray", "Navy"],
    inStock: true
  },
  {
    id: "8",
    name: "Wide-Leg Trousers",
    category: "bottoms",
    price: 69.99,
    rentPrice: 14.99,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=500",
    description: "Elegant wide-leg trousers with a high waist. Suitable for both office and evening wear.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Beige"],
    inStock: true,
    isFeatured: true
  },
  {
    id: "9",
    name: "Cocktail Party Dress",
    category: "dresses",
    price: 129.99,
    rentPrice: 29.99,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=500",
    description: "Stunning cocktail dress with sequin details. Perfect for parties and formal events.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Burgundy"],
    inStock: true
  },
  {
    id: "11",
    name: "Delicate Gold Bracelet",
    category: "jewelry",
    price: 39.99,
    rentPrice: 7.99,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=500",
    description: "Delicate gold-plated bracelet with minimalist design. Perfect for everyday wear.",
    inStock: true
  },
  {
    id: "12",
    name: "High Heel Sandals",
    category: "shoes",
    price: 89.99,
    rentPrice: 18.99,
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=500",
    description: "Elegant high heel sandals with ankle strap. Perfect for special occasions.",
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["Black", "Nude", "Silver"],
    inStock: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductsByCategory = (category: string | null): Product[] => {
  if (!category || category === 'all') {
    return products;
  }
  return products.filter(product => product.category === category.toLowerCase());
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};
