import React from "react";

import "./FullPageLoader.css";
import spinner from "../../assets/images/spinner.gif";

const FullPageLoader = () => {
  return (
    <div className="full-page-loader">
      <img src={spinner} className="full-page-loader__img" alt="loading" />
    </div>
  );
};

export default FullPageLoader;
