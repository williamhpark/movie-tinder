import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import OptionSelectPage from "./pages/OptionSelectPage/OptionSelectPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import FinalResultsPage from "./pages/FinalResultsPage/FinalResultsPage";
import JoinSessionPage from "./pages/JoinSessionPage/JoinSessionPage";
import SessionPage from "./pages/SessionPage/SessionPage";

const Routes = () => {
  const routes = [
    { name: "Home", path: "/", component: HomePage },
    { name: "Register", path: "/register", component: RegisterPage },
    { name: "Login", path: "/login", component: LoginPage },
    { name: "Options", path: "/options", component: OptionSelectPage },
    { name: "Results", path: "/results", component: ResultsPage },
    { name: "FinalResults", path: "/final", component: FinalResultsPage },
    { name: "JoinSession", path: "/join", component: JoinSessionPage },
    { name: "Session", path: "/session", component: SessionPage },
  ];

  const renderRoutes = () => {
    return routes.map((route) => {
      return (
        <Route
          key={route.name}
          exact
          path={route.path}
          component={route.component}
        />
      );
    });
  };

  return <Switch>{renderRoutes()}</Switch>;
};

export default Routes;
