import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import OptionSelectPage from "./pages/OptionSelectPage/OptionSelectPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import { ShowProvider } from "./ShowContext";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Options page</Link>
            </li>
            <li>
              <Link to="/results">Results page</Link>
            </li>
          </ul>
        </nav>
        <ShowProvider>
          <Switch>
            <Route exact path="/" component={OptionSelectPage} />
            <Route exact path="/results" component={ResultsPage} />
          </Switch>
        </ShowProvider>
      </div>
    </Router>
  );
};

export default App;
