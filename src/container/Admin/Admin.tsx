import React from "react";
import Header from "../../components/Header/Header";
import {Outlet} from "react-router-dom";

const Admin: React.FC= () => {

  return (
    <>
      <Header />
      <div className={"container"}>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;