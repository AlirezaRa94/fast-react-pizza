import propTypes from "prop-types";

import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { removeItem } from "./cartSlice";

RemoveItemButton.propTypes = {
  pizzaId: propTypes.number.isRequired,
};

function RemoveItemButton({ pizzaId }) {
  const dispath = useDispatch();

  return (
    <Button type="small" onClick={() => dispath(removeItem(pizzaId))}>
      Remove
    </Button>
  );
}

export default RemoveItemButton;
