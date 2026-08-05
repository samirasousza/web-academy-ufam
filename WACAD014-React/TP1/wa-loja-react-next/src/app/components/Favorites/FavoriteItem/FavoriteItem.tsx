import { useRemoveFavorite } from "@/app/hooks/useRemoveFavorite";
import { Product } from "@/app/types/product";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface FavoriteItemProps {
  favoriteItem: Product;
}

export default function FavoriteItem({ favoriteItem }: FavoriteItemProps) {
  const { id, nome, preco } = favoriteItem;
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    toast.success("Produto favorito removido!");
    queryClient.invalidateQueries({ queryKey: ["favoriteList"] });
  };

  const handleError = () => {
    toast.error("Erro ao escluir");
  };

  const { removeFavoriteProduct } = useRemoveFavorite(
    handleSuccess,
    handleError,
  );

  return (
    <tr key={id}>
      <td>{nome}</td>
      <td>R$ {preco}</td>
      {/* <td>{quantity}</td> */}

      {/* <td>R$ {getProductTotal(preco, quantity).toFixed(2)}</td> */}
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => removeFavoriteProduct(id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
