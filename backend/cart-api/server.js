const express = require('express');
const cartRoutes = require('./routes/cartRoutes');
const { redisClient } = require('./config/redisClient');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());
app.use('/api/cart', cartRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

redisClient.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Cart Service running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Redis connection failed:', err);
});
