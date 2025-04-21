
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'tops', name: 'Tops' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'dresses', name: 'Dresses' },
  { id: 'jackets', name: 'Jackets' },
  { id: 'jewelry', name: 'Jewelry' },
  { id: 'shoes', name: 'Shoes' },
];

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${currentCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
