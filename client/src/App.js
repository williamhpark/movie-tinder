import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { ShowProvider } from "./context/ShowContext";
import OptionSelectPage from "./pages/OptionSelectPage/OptionSelectPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

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
