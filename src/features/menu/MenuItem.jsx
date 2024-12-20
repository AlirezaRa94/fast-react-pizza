import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { addItem, getItemQuantity } from "../cart/cartSlice";
import RemoveCartItem from "../cart/RemoveCartItem";
import UpdateCartItemQuantity from "../cart/UpdateCartItemQuantity";

MenuItem.propTypes = {
  pizza: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    unitPrice: propTypes.number.isRequired,
    ingredients: propTypes.arrayOf(propTypes.string).isRequired,
    soldOut: propTypes.bool.isRequired,
    imageUrl: propTypes.string.isRequired,
  }).isRequired,
};

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispath = useDispatch();
  const currentQuantity = useSelector(getItemQuantity(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart(e) {
    e.preventDefault();

    const cartItem = {
      pizzaId: id,
      name,
      unitPrice,
      totalPrice: unitPrice * 1,
      quantity: 1,
    };

    dispath(addItem(cartItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateCartItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <RemoveCartItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
