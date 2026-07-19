import "dotenv/config";
import {Product } from "../../generated/prisma/client.js";
import { CreateProductDto } from "./product.types.js";
import { prisma } from "../../database/prisma.js";

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

export async function getProduct(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({ where: { id: id } });
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