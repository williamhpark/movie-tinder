import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { UserProvider } from "./context/UserContext";
import { ShowProvider } from "./context/ShowContext";
import Routes from "./App.routes";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <>
      <UserProvider>
        <ShowProvider>
          <Router>
            <Header />
            <div className="container">
              <Routes />
            </div>
          </Router>
        </ShowProvider>
      </UserProvider>
    </>
  );
};

export default App;
