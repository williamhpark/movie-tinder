import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OptionSelectPage from "./pages/OptionSelectPage/OptionSelectPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

const Routes = () => {
  const routes = [
    { name: "Home", path: "/", component: HomePage },
    { name: "Register", path: "/register", component: RegisterPage },
    { name: "Login", path: "/login", component: LoginPage },
    { name: "Options", path: "/options", component: OptionSelectPage },
    { name: "Results", path: "/results", component: ResultsPage },
  ];

  const renderRoutes = () => {
    return routes.map((route) => {
      return <Route exact path={route.path} component={route.component} />;
    });
  };

  return <Switch>{renderRoutes()}</Switch>;
};

export default Routes;
