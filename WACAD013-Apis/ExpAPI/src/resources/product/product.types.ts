import { Product } from "../../generated/prisma/client.js";

export type CreateProductDto = Pick<Product, "name" | "price" | "stockQuantity">;
export type UpdateProductDto = Pick<Product, "name" | "price" | "stockQuantity">;