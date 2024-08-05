const swaggerJsdoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
  info: {
    title: 'Vmax Auth Server',
    version: '1.0.0',
    description: 'Documentation for Vmax auth server API'
  },
  servers: [
    {
      url: 'http://localhost:3000', // Replace with your server URL
      description: 'Development server'
    }
  ]
};

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ['./routes/*.js'], // <-- Path to the API routes folder
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
