import { useState } from 'react';
import { Bell, Search, ShoppingCart } from 'lucide-react';
import '../styles/ProductInfo.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";

export default function ProductInfo() {
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const product = location.state?.product;

  // If no product data is available, redirect to home
  if (!product) {
    navigate('/home');
    return null;
  }

  function home() {
    navigate("/home")
  }

  function handleAddToCart() {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      size: selectedSize,
      image: product.image,
      quantity: 1,
    });
    navigate("/addtocart");
  }

  const sizes = [
    'US 6', 'US 6.5', 'US 7', 'US 7.5', 'US 8', 'US 8.5',
    'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 11.5',
    'US 12', 'US 12.5', 'US 13', 'US 13.5', 'US 14'
  ];

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="info-container">
      <Navbar />
      {/* <header className="info-header">
        <div className="info-hc">
          <div className="info-actions">
            <button className="icon-button">
              <Search size={20} />
            </button>
            <button className="icon-button">
              <Bell size={20} />
            </button>
            <div className="avatar">
              <img src="/api/placeholder/32/32" alt="User avatar" />
            </div>
          </div>
        </div>
      </header> */}

      <main className="info-content">
        <div className="info-page">
          <h1 className="title">Products</h1>
        </div>

        <div className="cont">
          <div className="product-desc">
            <p className="desc-txt">
              {product.description}
            </p>

            <h2 className="section-title">Benefits</h2>
            <ul className="benefits-list">
              <li>Leather and synthetic leather are durable with a classic look.</li>
              <li>Full-length encapsulated Air-Sole unit cushions for comfort and support.</li>
              <li>Solid rubber sole is durable and provides traction over varied surfaces.</li>
            </ul>
          </div>

          <div className="img-container">
            <img
              src={product.image}
              alt={product.name}
              className="info-image"
            />
          </div>

          <div className="prod-info">
            <h2 className="prod-title">{product.name}</h2>
            <p className="prod-category">{product.category}</p>
            <p className="prod-price">₱{product.price.toLocaleString()}</p>

            <p className="size-label">Sizes available</p>
            <p className="size-tip">Fits small, we recommend ordering half a size up</p>

            <div className="size-grid">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="action-buttons">
              <button className="cart-button" onClick={handleAddToCart} disabled={!selectedSize}>
                Add to cart
              </button>
              <button className="back-button" onClick={home}>
                Back
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}