import { useState, useMemo, use, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
const Home = () => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortBy, setSortBy] = useState('Featured');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const [products, setNewProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      await axios.get('http://localhost:3002/api/products')
        .then(response => {
          console.log(response)
          setNewProducts(response.data);
        })
        .catch(error => {
          console.error("Error fetching products:", error);
        });

    }

    fetchProducts();
  }, [products])

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


  // Close menus on outside click


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

  // Vite dynamic import for all images in src/pictures
  const pictures = import.meta.glob('../pictures/*', { eager: true, as: 'url' });

  const getProductImageUrl = (image) => {
    if (!image) return '';
    // If image is a filename (from /src/pictures), use dynamic import
    const filename = image.split('/').pop();
    for (const key in pictures) {
      if (key.endsWith(filename)) {
        return pictures[key];
      }
    }
    // If image is a backend path
    if (typeof image === 'string' && image.startsWith('/uploads/')) {
      return `http://localhost:3002${image}`;
    }
    return image;
  };

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
            <div className="product-card" key={product._id}>
              <div className="product-image-container">
                <img
                  src={getProductImageUrl(product.image)}
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