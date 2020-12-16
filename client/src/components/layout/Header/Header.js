import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import AuthOptions from "../../auth/AuthOptions/AuthOptions";

const Header = (props) => {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">Home page</h1>
      </Link>
      <AuthOptions />
    </header>
  );
};

export default Header;
