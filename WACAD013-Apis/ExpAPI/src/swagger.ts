import swaggerJsdoc from "swagger-jsdoc";
import getEnv from "./utils/validateEnv.js";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ExpAPI",
      version: "1.0.0",
      description: "Documentação da API da loja virtual",
    },
    servers: [
      {
        url: `http://localhost:${getEnv().PORT}/v1`,
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            price: { type: "number", format: "decimal" },
            stockQuantity: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateProduct: {
          type: "object",
          required: ["name", "price", "stockQuantity"],
          properties: {
            name: { type: "string", minLength: 3, maxLength: 50 },
            price: { type: "number", minimum: 0 },
            stock: { type: "integer", minimum: 0 },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            userTypeId: { type: "string", format: "uuid" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateUser: {
          type: "object",
          required: ["name", "email", "password", "userTypeId"],
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
            userTypeId: { type: "string", format: "uuid" },
          },
        },
        Signup: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
        Login: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
        ChangeLang: {
          type: "object",
          required: ["lang"],
          properties: {
            lang: { type: "string", enum: ["pt-BR", "en-US"] },
          },
        },
        CartItem: {
          type: "object",
          properties: {
            productId: { type: "string", format: "uuid" },
            quantity: { type: "integer", minimum: 1 },
          },
        },
        AddCartItem: {
          type: "object",
          required: ["productId", "quantity"],
          properties: {
            productId: { type: "string", format: "uuid" },
            quantity: { type: "integer", minimum: 1 },
          },
        },
        UpdateCartItem: {
          type: "object",
          required: ["quantity"],
          properties: {
            quantity: { type: "integer", minimum: 1 },
          },
        },
        PurchaseItem: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            purchaseId: { type: "string", format: "uuid" },
            productId: { type: "string", format: "uuid" },
            quantity: { type: "integer" },
            product: { $ref: "#/components/schemas/Product" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Purchase: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            userId: { type: "string", format: "uuid" },
            status: {
              type: "integer",
              description: "0=opened, 1=finished, 2=canceled",
            },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/PurchaseItem" },
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./src/resources/**/*.router.ts"],
});

export default swaggerSpec;
