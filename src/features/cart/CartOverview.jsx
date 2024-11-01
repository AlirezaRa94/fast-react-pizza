import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="bg-slate-800 p-4 text-sm uppercase text-slate-200 sm:p-6 md:text-base">
      <p className="space-x-4 font-semibold text-slate-300 sm:space-x-6">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
