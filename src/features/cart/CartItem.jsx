import propTypes from "prop-types";

import { formatCurrency } from "../../utils/helpers";
import RemoveItemButton from "./RemoveItemButton";

CartItem.propTypes = {
  item: propTypes.shape({
    pizzaId: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    quantity: propTypes.number.isRequired,
    totalPrice: propTypes.number.isRequired,
  }).isRequired,
};

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <RemoveItemButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
