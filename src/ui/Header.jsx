import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="border-b border-slate-200 bg-gradient-to-r from-indigo-100 to-indigo-600 px-4 py-3 uppercase sm:px-6">
      <Link className="tracking-widest" to="/">
        Fast React Pizza Co.
      </Link>

      <SearchOrder />

      <UserName />
    </header>
  );
}

export default Header;
