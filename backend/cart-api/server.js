const express = require('express');
const cartRoutes = require('./routes/cartRoutes');
const { redisClient } = require('./config/redisClient');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json());
app.use('/api/cart', cartRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

redisClient.connect().then(() => {
  console.log('Connected to Redis successfully');
  app.listen(PORT, () => {
    console.log(`Cart Service running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
  console.error('Redis connection failed:', err);
});
