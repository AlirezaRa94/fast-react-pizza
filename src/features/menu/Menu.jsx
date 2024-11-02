import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y-2 divide-stone-200 px-3">
      {menu.map((menuItem) => (
        <MenuItem key={menuItem.id} pizza={menuItem} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = getMenu();
  return menu;
}

export default Menu;
