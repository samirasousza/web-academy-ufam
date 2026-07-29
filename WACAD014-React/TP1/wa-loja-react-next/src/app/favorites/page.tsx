"use client";

import { useState } from "react";
import FavoriteList from "../components/Favorites/FavoriteList/FavoriteList";
import { Product } from "../types/product";

export default function Favorites() {
  const [favItens, setFavItens] = useState<Product[]>([]);

  const removeItemFromFavorites = (id: string): void => {
    setFavItens((prev) => prev.filter((item) => item.id !== id));
  };



  return (
    <>
      <main>
        <div className="container p-5">
          <FavoriteList
            favoriteItems={favItens}
            removeItemFromFavorite={removeItemFromFavorites}
          />

        </div> 
      </main>
    </>
  );
}
