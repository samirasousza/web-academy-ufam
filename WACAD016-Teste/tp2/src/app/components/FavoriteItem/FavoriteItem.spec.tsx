import { calculatePriceWithDiscount } from "@/app/helpers";
import { mockProducts } from "@/app/mocks/products";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteItem from "./FavoriteItem";

describe("FavoriteItem", () => {
  it("should render favorite item information correctly", () => {
    const favoriteItem = mockProducts[0];

    const priceWithDiscount = calculatePriceWithDiscount(
      Number(favoriteItem.preco),
      favoriteItem.desconto
    ).toFixed(2);

    render(
      <table>
        <tbody>
          <FavoriteItem
            favoriteItem={favoriteItem}
            setFavorites={() => {}}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText(favoriteItem.nome)).toBeInTheDocument();

    expect(
      screen.getByText(favoriteItem.descricao)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`R$ ${priceWithDiscount}`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`${favoriteItem.desconto}%`)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /remover/i })
    ).toBeInTheDocument();
  });

  it("should remove the favorite item when clicking the remove button", async () => {
    const user = userEvent.setup();
    const setFavorites = jest.fn();

    const favoriteItem = mockProducts[0];

    render(
      <table>
        <tbody>
          <FavoriteItem
            favoriteItem={favoriteItem}
            setFavorites={setFavorites}
          />
        </tbody>
      </table>
    );

    const button = screen.getByRole("button", {
      name: /remover/i,
    });

    await user.click(button);

    expect(setFavorites).toHaveBeenCalledTimes(1);
  });

  it("should remove only the selected item from favorites", async () => {
    const user = userEvent.setup();

    const favoriteItem = mockProducts[0];
    const anotherProduct = mockProducts[1];

    let updatedFavorites: Product[] = [];

    const setFavorites = jest.fn((callback) => {
      const currentFavorites = [favoriteItem, anotherProduct];

      updatedFavorites = callback(currentFavorites);
    });

    render(
      <table>
        <tbody>
          <FavoriteItem
            favoriteItem={favoriteItem}
            setFavorites={setFavorites}
          />
        </tbody>
      </table>
    );

    const button = screen.getByRole("button", {
      name: /remover/i,
    });

    await user.click(button);

    expect(updatedFavorites).toEqual([anotherProduct]);
  });
});