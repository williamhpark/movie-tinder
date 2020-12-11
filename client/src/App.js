import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import OptionSelectPage from "./pages/OptionSelectPage/OptionSelectPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import { ShowProvider } from "./ShowContext";

const App = () => {
  return (
    <ShowProvider>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={OptionSelectPage} />
            <Route exact path="/results" component={ResultsPage} />
          </Switch>
        </div>
      </Router>
    </ShowProvider>
  );
};

export default App;
