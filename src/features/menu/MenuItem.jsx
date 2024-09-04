import propTypes from "prop-types";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

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
    <li>
      <img src={imageUrl} alt={name} />
      <div>
        <p>{name}</p>
        <p>{ingredients.join(", ")}</p>
        <div>
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
