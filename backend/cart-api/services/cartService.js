const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const PRODUCT_API_URL = 'http://localhost:3002/api/products'; // Adjust as needed
const ORDER_API_URL = 'http://localhost:4000/api/orders'; // Assuming order service is on port 4000

// In-memory cart storage: { userId: { productId: quantity, ... }, ... }
const carts = {};

class CartService {
  async addToCart(userId, productId, quantity) {
    const product = await this.fetchProduct(productId);
    if (!product) throw new Error('Product not found');
    if (product.stock < quantity) throw new Error('Not enough stock');

    if (!carts[userId]) carts[userId] = {};
    const existingQty = parseInt(carts[userId][productId] || 0);
    const newQty = existingQty + parseInt(quantity);

    if (newQty > product.stock) {
      throw new Error('Adding this quantity exceeds available stock');
    }

    carts[userId][productId] = newQty;
    console.log(`Added ${quantity} of product ${productId} to cart for user ${userId}`);
    console.log(`Current quantity in cart: ${newQty}`);
    return { productId, quantity: newQty };
  }

  async getCart(userId) {
    return carts[userId] || {};
  }

  async removeFromCart(userId, productId) {
    if (carts[userId] && carts[userId][productId]) {
      delete carts[userId][productId];
      return { productId, removed: true };
    }
    return { productId, removed: false };
  }

  async checkout(userId) {
    const cart = carts[userId];
    if (!cart || Object.keys(cart).length === 0) {
      throw new Error('Cart is empty');
    }

    const orderData = {
      userId,
      items: Object.entries(cart).map(([productId, quantity]) => ({
        productId,
        quantity: parseInt(quantity)
      }))
    };

    try {
      const response = await axios.post(ORDER_API_URL, orderData);
      if (response.status === 201) {
        delete carts[userId];
        return { success: true, order: response.data };
      } else {
        throw new Error('Order service failed to create the order');
      }
    } catch (err) {
      throw new Error(`Checkout failed: ${err.message}`);
    }
  }

  async fetchProduct(productId) {
    try {
      const res = await axios.get(`${PRODUCT_API_URL}/${productId}`);
      return res.data;
    } catch {
      return null;
    }
  }
}

module.exports = new CartService();
