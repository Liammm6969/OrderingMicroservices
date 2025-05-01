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
          <div className="product-card">
            <div className="product-image-container">
              <img
                src="./src/pictures/1.png"
                alt="Nike Air Monarch IV"
                className="product-image"
                onClick={info}
              />
            </div>
            <div className="product-info">
              <div className="product-details">
                <h3 className="product-name">Nike Air Monarch IV</h3>
                <p className="product-category">Men's Workout Shoes</p>
                <p className="product-price">₱2,595</p>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image-container">
              <img
                src="./src/pictures/2.png"
                alt="Nike V2K Run"
                className="product-image"
              />
            </div>
            <div className="product-info">
              <div className="product-details">
                <h3 className="product-name">Nike V2K Run</h3>
                <p className="product-category">Men's Shoes</p>
                <p className="product-price">₱6,895</p>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image-container">
              <img
                src="./src/pictures/3.png"
                alt="Nike Zoom Vomero 5"
                className="product-image"
              />
            </div>
            <div className="product-info">
              <div className="product-details">
                <h3 className="product-name">Nike Zoom Vomero 5</h3>
                <p className="product-category">Men's Shoes</p>
                <p className="product-price">₱8,895</p>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image-container">
              <img
                src="./src/pictures/4.png"
                alt="Nike V2K Run"
                className="product-image"
              />
            </div>
            <div className="product-info">
              <div className="product-details">
                <h3 className="product-name">Nike V2K Run</h3>
                <p className="product-category">Women's Shoes</p>
                <p className="product-price">₱6,895</p>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image-container">
              <img
                src="./src/pictures/5.png"
                alt="Nike V2K Run"
                className="product-image"
              />
            </div>
            <div className="product-info">
              <div className="product-details">
                <h3 className="product-name">Nike V2K Run</h3>
                <p className="product-category">Men's Shoes</p>
                <p className="product-price">₱6,895</p>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image-container">
              <img
                src="./src/pictures/6.png"
                alt="Nike Air Monarch IV"
                className="product-image"
              />
            </div>
            <div className="product-info">
              <div className="product-details">
                <h3 className="product-name">Nike Air Monarch IV</h3>
                <p className="product-category">Men's Workout Shoes</p>
                <p className="product-price">₱2,595</p>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image-container">
              <img
                src="./src/pictures/7.png"
                alt="Nike P-6000"
                className="product-image"
              />
            </div>
            <div className="product-info">
              <div className="product-details">
                <h3 className="product-name">Nike P-6000</h3>
                <p className="product-category">Shoes</p>
                <p className="product-price">₱4,995</p>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image-container">
              <img
                src="./src/pictures/8.png"
                alt="Nike Cortez Leather"
                className="product-image"
              />
            </div>
            <div className="product-info">
              <div className="product-details">
                <h3 className="product-name">Nike Cortez Leather</h3>
                <p className="product-category">Men's Shoes</p>
                <p className="product-price">₱4,695</p>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image-container">
              <img
                src="./src/pictures/9.png"
                alt="Nike Waffle Nav"
                className="product-image"
              />
            </div>
            <div className="product-info">
              <div className="product-details">
                <h3 className="product-name">Nike Waffle Nav</h3>
                <p className="product-category">Men's Shoes</p>
                <p className="product-price">₱4,295</p>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image-container">
              <img
                src="./src/pictures/10.png"
                alt="Nike Air Pegasus 2005"
                className="product-image"
              />
            </div>
            <div className="product-info">
              <div className="product-details">
                <h3 className="product-name">Nike Air Pegasus 2005</h3>
                <p className="product-category">Men's Shoes</p>
                <p className="product-price">₱8,395</p>
              </div>
            </div>
          </div>
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