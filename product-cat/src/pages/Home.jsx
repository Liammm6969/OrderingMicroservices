import { useState } from 'react';
import {
  Search,
  Bell,
  ShoppingCart,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../pages/Navbar';
const Home = () => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortBy, setSortBy] = useState('Featured');
  const navigate = useNavigate();

  function info() {
    navigate('/productinfo')
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

  const getAllProducts = () => {

    //api something
  }
  const products = [
    { id: 1, name: 'Nike Air Monarch IV', price: 2595, category: 'Men\'s Workout Shoes' },
    { id: 2, name: 'Nike V2K Run', price: 6895, category: 'Men\'s Shoes' },
    { id: 3, name: 'Nike Zoom Vomero 5', price: 8895, category: 'Men\'s Shoes' },
    { id: 4, name: 'Nike V2K Run', price: 6895, category: 'Women\'s Shoes' },
    { id: 5, name: 'Nike V2K Run', price: 6895, category: 'Men\'s Shoes' },
    { id: 6, name: 'Nike Air Monarch IV', price: 2595, category: 'Men\'s Workout Shoes' },
    { id: 7, name: 'Nike P-6000', price: 4995, category: 'Shoes' },
    { id: 8, name: 'Nike Cortez Leather', price: 4695, category: 'Men\'s Shoes' },
    { id: 9, name: 'Nike Waffle Nav', price: 4295, category: 'Men\'s Shoes' },
    { id: 10, name: 'Nike Air Pegasus 2005', price: 8395, category: 'Men\'s Shoes' },

  ];
  return (
    <div className="app-container">

      <header className="header">
        {/* <div className="header-content">
          <div className="header-actions">
            <button className="icon-button">
              <Search size={20} />
            </button>
            <button className="icon-button">
              <Bell size={20} />
            </button>
            <img 
              src="/api/placeholder/36/36" 
              alt="User Profile" 
              className="avatar"
            />
          </div>
        </div> */}
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
                <span>Filters</span>
              </button>

              {showFilterMenu && (
                <div className="dropdown-menu">
                  <button className="dropdown-item">All</button>
                  <button className="dropdown-item">Men's Shoes</button>
                  <button className="dropdown-item">Women's Shoes</button>
                  <button className="dropdown-item">Workout Shoes</button>
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

            <button className="cart-button">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                <img
                  src={`./src/pictures/${product.id}.png`}
                  alt={product.name}
                  className="product-image"
                  onClick={info}
                />
              </div>
              <div className="product-info">
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">₱{product.price}</p>
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