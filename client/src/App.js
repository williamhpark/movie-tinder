import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Usercontext } from "./Context";

import "./App.css";
import OptionSelectPage from "./pages/OptionSelectPage/OptionSelectPage";
import MovieInformationPage from "./pages/MovieInformationPage/MovieInformationPage";
import TypeSelect from "./components/TypeSelect/TypeSelect";

const App = () => {
  const [isMovie, setIsMovie] = useState(false);
  const [isSeries, setIsSeries] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/"> Optionspage</Link>
          </li>
          <li>
            <Link to="/Movies">Moviespage</Link>
          </li>
        </ul>
        <Switch>
          <Usercontext.Provider
            value={{
              contextMovie: [isMovie, setIsMovie],
              contextSeries: [isSeries, setIsSeries],
              contextSelectedGenres: [selectedGenres, setSelectedGenres],
            }}
          >
            <Route exact path="/">
              <OptionSelectPage />
            </Route>
            <Route exact path="/Movies">
              <MovieInformationPage />
            </Route>
          </Usercontext.Provider>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
