import propTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";

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
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

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

          <Button disabled={soldOut} type="small">
            Add to order
          </Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
