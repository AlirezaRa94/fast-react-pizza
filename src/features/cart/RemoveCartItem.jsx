import propTypes from "prop-types";

import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { removeItem } from "./cartSlice";

RemoveCartItem.propTypes = {
  pizzaId: propTypes.number.isRequired,
};

function RemoveCartItem({ pizzaId }) {
  const dispath = useDispatch();

  return (
    <Button type="small" onClick={() => dispath(removeItem(pizzaId))}>
      Remove
    </Button>
  );
}

export default RemoveCartItem;
