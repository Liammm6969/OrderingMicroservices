const orderRepo = require('../repositories/orderRepository');
const eventBus = require('../events/eventBus');

class OrderService {
  async createOrder(data) {
    const order = await orderRepo.create(data);
    console.log('Order created:', JSON.stringify(order, null, 2)); // Debug log
    try {
      await eventBus.publish('OrderPlaced', {
        orderId: order._id,
        userId: order.userId,
        items: order.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        createdAt: order.createdAt
      });
    } catch (err) {
      console.error('EventBus publish error:', err);
      // Optionally, you can throw or handle this error as needed
    }
    return order;
  }

  getAllOrders() {
    return orderRepo.getAll();
  }

  getOrderById(id) {
    return orderRepo.getById(id);
  }

  getOrdersByUserId(userId) {
    return orderRepo.getByUserId(userId);
  }
}

module.exports = new OrderService();
