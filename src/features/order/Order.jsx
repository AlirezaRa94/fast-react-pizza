import { getOrder } from "../../services/apiRestaurant";

function Order() {
  return <h1>order</h1>;
}

export async function loader({ params }) {
  const order = getOrder(params.orderId);
  return order;
}

export default Order;
