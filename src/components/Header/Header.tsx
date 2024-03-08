import React from "react";
import {Link} from "react-router-dom";
import NavBarAdmin from "../NavBarAdmin/NavBarAdmin";

const Header: React.FC = () => {
  return (
    <header className={"border p-3"}>
      <div className={"container d-flex align-items-center justify-content-between"}>
        <Link to={"/admin"} className={"text-dark nav-link"}>
          <h3>Turtle Pizza Admin</h3>
        </Link>
        <NavBarAdmin />
      </div>
    </header>
  );
};

export default Header;