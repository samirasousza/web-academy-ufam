import { CartItemType } from "@/app/types/cartItem";

interface CardItemProps {
  cardItem: CartItemType;
  removeItemFromCart: (id: string) => void;
}

export default function CartItem(props: CardItemProps) {
  const { cardItem, removeItemFromCart } = props;
  const { id, name, value, quantity } = cardItem;

  const getProductTotal = (price: number, quantity: number): number =>
    price * quantity;

  return (
    <tr key={id}>
      <td>{name}</td>
      <td>R$ {value.toFixed(2)}</td>
      <td>{quantity}</td>

      <td>R$ {getProductTotal(value, quantity).toFixed(2)}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => removeItemFromCart(id)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
