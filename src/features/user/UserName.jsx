import { useSelector } from "react-redux";

import { getUsername } from "./userSlice";

function UserName() {
  const username = useSelector(getUsername);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold text-stone-900 md:block">
      {username}
    </div>
  );
}

export default UserName;
