"use client";
import { useState } from "react";
import CartSummary from "./components/Cart/CartSummary/CartSummary";
import ProductList from "./components/Products/ProductList/ProductList";
import { mockProducts } from "./mocks/ProductsMock";
import { Product } from "./types/product";

export default function Products() {
  const [totalPurchase, setTotalPurchase] = useState<number>(0);
  const [totalQuantityItems, setTotalQuantityItems] = useState<number>(0);

  const addToCart = (product: Product): void => {
    const price = Number(product.value);

    setTotalQuantityItems((prev) => prev + 1);
    setTotalPurchase((prev) => prev + price);
  };

  return (
    <>
      <main>
        <div className="container p-5">
          <CartSummary
            totalQuantityItems={totalQuantityItems}
            totalPurchase={totalPurchase}
          />

          <ProductList products={mockProducts} addToCart={addToCart} />
        </div>
      </main>
    </>
  );
}
