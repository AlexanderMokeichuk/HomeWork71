import React from "react";
import {NavLink} from "react-router-dom";

const NavBarAdmin: React.FC = () => {
  return (
    <ul className="nav nav-pills nav-fill">
      <li className="nav-item">
        <NavLink to={"dishes"} className={"nav-link"}>Dishes</NavLink>
      </li>
      <li className={"nav-item"}>
        <NavLink to={"orders"} className={"nav-link"}>Orders</NavLink>
      </li>
    </ul>
  );
};

export default NavBarAdmin;