const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CodeVector Product API",
            version: "1.0.0",
            description: "Backend API for browsing 200,000+ products",
        },
        servers: [
            {
                url:
                    process.env.NODE_ENV === "production"
                        ? "https://codevector-task-r3x5.onrender.com"
                        : "http://localhost:3000",
            },
        ],
    },
    apis: [__dirname + "/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;