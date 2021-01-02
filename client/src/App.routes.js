import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import FinalResultsPage from "./pages/FinalResultsPage/FinalResultsPage";
import JoinSessionPage from "./pages/JoinSessionPage/JoinSessionPage";
import SessionPage from "./pages/SessionPage/SessionPage";
import WaitingPage from "./pages/WaitingPage/WaitingPage";

const Routes = () => {
  const routes = [
    { name: "Home", path: "/", Component: HomePage },
    { name: "Register", path: "/register", Component: RegisterPage },
    { name: "Login", path: "/login", Component: LoginPage },
    { name: "Results", path: "/results", Component: ResultsPage },
    { name: "FinalResults", path: "/final", Component: FinalResultsPage },
    { name: "JoinSession", path: "/join", Component: JoinSessionPage },
    { name: "Session", path: "/session", Component: SessionPage },
    { name: "Waiting", path: "/waiting", Component: WaitingPage },
  ];

  const renderRoutes = () => {
    return routes.map((route) => {
      return (
        <Route
          key={route.name}
          exact
          path={route.path}
          component={route.Component}
        />
      );
    });
  };

  return <Switch>{renderRoutes()}</Switch>;
};

export default Routes;
