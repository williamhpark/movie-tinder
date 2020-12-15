import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { UserProvider } from "./context/UserContext";
import { ShowProvider } from "./context/ShowContext";
import Routes from "./Routes";
import Header from "./components/layout/Header/Header";

const App = () => {
  return (
    <>
      <UserProvider>
        <ShowProvider>
          <Router>
            <div>
              <Header />
              <Routes />
            </div>
          </Router>
        </ShowProvider>
      </UserProvider>
    </>
  );
};

export default App;
