"use client";

import { toast } from "react-toastify";
import FavoriteList from "../components/Favorites/FavoriteList/FavoriteList";
import { useFavoriteList } from "../hooks/useFavoriteList";

export default function Favorites() {
  const { favoriteList, isPending, isError } = useFavoriteList();

  if (isPending) {
    return <p>Carregando favoritos...</p>;
  }

  if (isError) {
    toast.error("Erro ao carregar favoritos.");
  }

  return (
    <>
      <main>
        <div className="container p-5">
          <FavoriteList favoriteItems={favoriteList} />
        </div>
      </main>
    </>
  );
}
