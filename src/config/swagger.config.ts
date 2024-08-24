import { Options } from 'swagger-jsdoc';

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CRM API',
            version: '1.0.0',
            description: 'API documentation for the CRM application',
        },
        servers: [
            {
                url: 'https://crm-uo1v.onrender.com',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Optional, but useful for indicating JWT format
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Apply this security scheme globally
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/models/*.ts'],
};

export default options;
