import { useState, useMemo } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortBy, setSortBy] = useState('Featured');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  function info(product) {
    navigate('/productinfo', { state: { product } });
  }

  const toggleSortMenu = () => {
    setShowSortMenu(!showSortMenu);
    if (showFilterMenu) setShowFilterMenu(false);
  };

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
    if (showSortMenu) setShowSortMenu(false);
  };

  const handleSortSelect = (option) => {
    setSortBy(option);
    setShowSortMenu(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowFilterMenu(false);
  };

  const products = [
    { id: 1, name: 'Nike Air Monarch IV', price: 2595, category: 'Men\'s Workout Shoes', description: 'Men\'s Workout Shoes', image: './src/pictures/1.png' },
    { id: 2, name: 'Nike V2K Run', price: 6895, category: 'Men\'s Shoes', description: 'Men\'s Shoes', image: './src/pictures/2.png' },
    { id: 3, name: 'Nike Zoom Vomero 5', price: 8895, category: 'Men\'s Shoes', description: 'Men\'s Shoes', image: './src/pictures/3.png' },
    { id: 4, name: 'Nike V2K Run', price: 6895, category: 'Women\'s Shoes', description: 'Women\'s Shoes', image: './src/pictures/4.png' },
    { id: 5, name: 'Nike V2K Run', price: 6895, category: 'Men\'s Shoes', description: 'Men\'s Shoes', image: './src/pictures/5.png' },
    { id: 6, name: 'Nike Air Monarch IV', price: 2595, category: 'Men\'s Workout Shoes', description: 'Men\'s Workout Shoes', image: './src/pictures/6.png' },
    { id: 7, name: 'Nike P-6000', price: 4995, category: 'Shoes', description: 'Shoes', image: './src/pictures/7.png' },
    { id: 8, name: 'Nike Cortez Leather', price: 4695, category: 'Men\'s Shoes', description: 'Men\'s Shoes', image: './src/pictures/8.png' },
    { id: 9, name: 'Nike Waffle Nav', price: 4295, category: 'Men\'s Shoes', description: 'Men\'s Shoes', image: './src/pictures/9.png' },
    { id: 10, name: 'Nike Air Pegasus 2005', price: 8395, category: 'Men\'s Shoes', description: 'Men\'s Shoes', image: './src/pictures/10.png' },
  ];

  // Get unique categories for filter menu
  const categories = useMemo(() => {
    const uniqueCategories = ['All', ...new Set(products.map(product => product.category))];
    return uniqueCategories;
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    // First filter by category
    let filtered = selectedCategory === 'All' 
      ? products 
      : products.filter(product => product.category === selectedCategory);

    // Then sort the filtered products
    switch (sortBy) {
      case 'Price: Low to High':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'Newest':
        return [...filtered].sort((a, b) => b.id - a.id);
      case 'Featured':
      default:
        return filtered;
    }
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="app-container">
      <header className="header">
        <Navbar />
      </header>

      <main className="main-content">
        <div className="products-header">
          <h1 className="page-title">Products</h1>

          <div className="header-controls">
            <div className="dropdown-container">
              <button
                className="control-button"
                onClick={toggleFilterMenu}
              >
                <SlidersHorizontal size={16} className="button-icon" />
                <span>Filters: {selectedCategory}</span>
              </button>

              {showFilterMenu && (
                <div className="dropdown-menu">
                  {categories.map((category) => (
                    <button 
                      key={category}
                      className="dropdown-item"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="dropdown-container">
              <button
                className="control-button"
                onClick={toggleSortMenu}
              >
                <span>Sort by: {sortBy}</span>
                <ChevronDown size={16} className="button-icon" />
              </button>

              {showSortMenu && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortSelect('Featured')}
                  >
                    Featured
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortSelect('Price: Low to High')}
                  >
                    Price: Low to High
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortSelect('Price: High to Low')}
                  >
                    Price: High to Low
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortSelect('Newest')}
                  >
                    Newest
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="products-grid">
          {filteredAndSortedProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  onClick={() => info(product)}
                />
              </div>
              <div className="product-info">
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">₱{product.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-container">
          <button className="view-all-button">
            View All Products
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;