import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description:
        "A simple CRUD API application made with Express and documented with Swagger",
    },
  },
  apis: ["./src/routes/*.ts"], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
