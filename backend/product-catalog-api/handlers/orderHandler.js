const eventBus = require('../events/eventsBus');
const productService = require('../services/productService');

async function listenToOrderPlaced() {
  await eventBus.subscribe('OrderPlaced', async (event) => {
    console.log('OrderPlaced event received:', event);

    // New format:
    // {
    //   orderId: "order123",
    //   userId: "user456",
    //   items: [
    //     { productId: "abc123", quantity: 2 },
    //     { productId: "def456", quantity: 1 }
    //   ],
    //   createdAt: "2024-05-20T12:00:00Z"
    // }

    for (const item of event.items) {
      const product = await productService.getProductById(item.productId);

      if (product && product.stock >= item.quantity) {
        const newStock = product.stock - item.quantity;
        await productService.updateStock(item.productId, newStock);
        console.log(`Stock updated for product ${item.productId}: ${newStock}`);
      } else {
        console.warn(`Insufficient stock for product ${item.productId}`);
      }
    }
  });
}

module.exports = listenToOrderPlaced;
