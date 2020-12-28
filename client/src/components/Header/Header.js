import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import AuthOptions from "../AuthOptions/AuthOptions";

const Header = (props) => {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__title">MATCHI</h1>
      </Link>
      <AuthOptions />
    </header>
  );
};

export default Header;
