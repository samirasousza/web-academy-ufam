"use client";

import ProductList from "./components/ProductList/ProductList";
import { mockProducts } from "./mocks/products";
import FavoritesProvider from "./State/FavoritesProvider";

export default function HomePage() {
  const products = mockProducts;

  return (
    <main>
      <div className="container p-5">
        <ProductList products={products} />
      </div>
    </main>
  );
}
