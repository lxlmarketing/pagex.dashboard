import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/pagex_logo.png";

const Layout = () => {
  return (
    <div className="sidebar-container">
      <div className="d-flex justify-content-center mb-3">
        <img src={logo} alt="PageX" style={{ height: 40 }} />
      </div>
      <Link to="/accounts">Contas</Link>
      <Link to="/logs">Logs</Link>
    </div>
  );
};

export default Layout;
