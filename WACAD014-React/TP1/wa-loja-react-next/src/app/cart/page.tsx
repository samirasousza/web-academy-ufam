"use client";

import { useState } from "react";
import CartList from "../components/Cart/CartList/CartList";
import CartSummary from "../components/Cart/CartSummary/CartSummary";
import { mockCartItems } from "../mocks/cartItemsMock";
import { CartItemType } from "../types/cartItem";

export default function Cart() {
  const [cartItens, setCartItens] = useState<CartItemType[]>(mockCartItems);

  const removeItemFromCart = (id: string): void => {
    setCartItens((prev) => prev.filter((item) => item.id !== id));
  };

  const totalQuantityItems = cartItens.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPurchase = cartItens.reduce(
    (total, item) => total + item.value * item.quantity,
    0,
  );

  return (
    <>
      <main>
        <div className="container p-5">
          <CartList
            cartItems={cartItens}
            removeItemFromCart={removeItemFromCart}
          />

          <CartSummary
            totalQuantityItems={totalQuantityItems}
            totalPurchase={totalPurchase}
          />
        </div> 
      </main>
    </>
  );
}
