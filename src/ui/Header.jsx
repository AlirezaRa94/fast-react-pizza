import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-100 to-indigo-600 uppercase">
      <Link className="tracking-widest" to="/">
        Fast React Pizza Co.
      </Link>

      <SearchOrder />

      <p>Alireza</p>
    </header>
  );
}

export default Header;
