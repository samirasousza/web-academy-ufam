import { Product } from "@/app/types/product";

interface FavoriteItemProps {
  favoriteItem: Product;
  removeItemFromFavorite: (id: string) => void;
}

export default function FavoriteItem(props: FavoriteItemProps) {
  const { favoriteItem, removeItemFromFavorite } = props;
  const { id, nome, preco, } = favoriteItem;

  const getProductTotal = (price: number, quantity: number): number =>
    price * quantity;

  return (
    <tr key={id}>
      <td>{nome}</td>
      <td>R$ {preco}</td>
      {/* <td>{quantity}</td> */}

      {/* <td>R$ {getProductTotal(preco, quantity).toFixed(2)}</td> */}
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => removeItemFromFavorite(id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
