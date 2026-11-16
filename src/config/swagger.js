import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Restaurant API",
            version: "1.0.0",
            description: "Restaurant management API documentation"
        },

        servers: [
            {
                url: "http://localhost:3000/api"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: ["./src/routes/*.js"]
};

export const swaggerSpec = swaggerJSDoc(options);