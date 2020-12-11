import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import OptionSelectPage from "./pages/OptionSelectPage/OptionSelectPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import { ShowProvider } from "./ShowContext";

const App = () => {
  const routes = [
    { name: "Options", path: "/", component: OptionSelectPage },
    { name: "Results", path: "/results", component: ResultsPage },
  ];

  return (
    <ShowProvider>
      <Router>
        <div>
          <Switch>
            {routes.map((route) => {
              return (
                <Route exact path={route.path} component={route.component} />
              );
            })}
          </Switch>
        </div>
      </Router>
    </ShowProvider>
  );
};

export default App;
