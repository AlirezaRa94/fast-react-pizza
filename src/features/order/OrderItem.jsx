import propTypes from "prop-types";

import { formatCurrency } from "../../utils/helpers";

OrderItem.propTypes = {
  item: propTypes.shape({
    quantity: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    totalPrice: propTypes.number.isRequired,
  }).isRequired,
  isLoadingIngredients: propTypes.bool.isRequired,
  ingredients: propTypes.arrayOf(propTypes.string).isRequired,
};

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-xs capitalize italic text-stone-500">
        {isLoadingIngredients ? "Loading..." : ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
