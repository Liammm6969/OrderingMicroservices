// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'Simple authentication API with Swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:9000',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
        
            email: {
              type: 'string',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              example: 'securePassword123',
            },
          },
        },
      },
    },
  },
  apis: ['./index.js'], // where your JSDoc comments are
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
