import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, Product } from "../../generated/prisma/client.js";
import { CreateProductDto } from "./product.types.js";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT!),
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });

export async function getAllProducts(): Promise<Product[]> {
  return await prisma.product.findMany();
}

export async function createProduct(
  product: CreateProductDto,
): Promise<Product> {
  return await prisma.product.create({ data: product });
}

export async function productAlreadyExists(name: string): Promise<boolean> {
  const product = await prisma.product.findUnique({ where: { name } });
  return product !== null;
}

export async function getProduct(id: string): Promise<Product> {
    const product = await prisma.product.findUnique({ where: { id: id } });
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
}

export async function updateProduct(id: string, product: CreateProductDto): Promise<Product> {
    const updatedProduct = await prisma.product.update({ where: { id: id }, data: product });
    return updatedProduct;
}

export async function removeProduct(id: string): Promise<string> {
    const deletedProduct = await prisma.product.delete({ where: {id: id}});
    return deletedProduct.id;
}