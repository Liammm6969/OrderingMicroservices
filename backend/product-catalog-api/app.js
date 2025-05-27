const express = require('express');
const app = express();
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const productRoutes = require('./routes/productRoutes');
const listenToOrderPlaced = require('./handlers/orderHandler');
const eventBus = require('./events/eventsBus');

const cors = require('cors');

app.use(cors()); // Enable CORS for all routes
connectDB();

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// eventBus.publish('OrderPlaced', { productId: 'abc123', quantity: 1 });

listenToOrderPlaced();



const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});