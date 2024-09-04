import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul>
      {menu.map((menuItem) => (
        <li key={menuItem.id}>{menuItem.name}</li>
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = getMenu();
  return menu;
}

export default Menu;
