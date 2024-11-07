import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { createOrder } from "../../services/apiRestaurant";
import { isValidPhone } from "../../utils/helpers";
import Button from "../../ui/Button";
import { fetchAddress } from "../user/userSlice";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? Math.round(totalCartPrice * 0.2) : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (cart.length === 0) return <EmptyCart />;

  function handleGetPosition(e) {
    e.preventDefault();

    dispatch(fetchAddress());
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-lg font-semibold">
        {"Ready to order? Let's go!"}
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              required
              className="input"
              defaultValue={username}
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input"
              defaultValue={address}
              disabled={isLoadingAddress}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitue && (
            <span className="absolute right-[3px] top-[35px] z-50 sm:top-[3px] md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                onClick={handleGetPosition}
                disabled={isLoadingAddress}
              >
                {isLoadingAddress ? "Loading..." : "Get Position"}
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriority}
            onChange={() => setWithPriority(!withPriority)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting ? "Placing order..." : "Order Now"}
          </Button>
          <p className="mt-2 text-sm text-stone-500">
            {`Total Price: ${formatCurrency(totalPrice)}`}
          </p>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = {};

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us a valid phone number. We might need to call you!";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // Do not overuse store.dispatch in actions
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
