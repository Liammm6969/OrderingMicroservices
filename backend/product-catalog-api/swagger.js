const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Catalog API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '66259a8f05736e5d4d6ddf1a' },
            name: { type: 'string', example: 'Test Product' },
            price: { type: 'number', example: 100 },
            stock: { type: 'integer', example: 10 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          },
          required: ['name', 'price', 'stock']
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJSDoc(options);