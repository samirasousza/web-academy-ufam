"use client";

import { useMutation } from "@tanstack/react-query";
import { Product } from "../types/product";
import { toast } from "react-toastify";
import { addFavorite } from "../services/favorites";

export function useFavoriteProduct() {
  const { mutate, isPending } = useMutation({
    mutationFn: (product: Product) => addFavorite(product),

    onSuccess: () => {
      toast.success("Produto adicionado aos favoritos!");
    },

    onError: () => {
      toast.error("Erro ao adicionar favorito.");
    },
  });

  return { addFavorite: mutate, isPending };
}
