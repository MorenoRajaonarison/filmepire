import React from "react";
import { CssBaseline } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import { MovieInfo, Actors, Movie, Profile, Navbar } from "./";

const App = () => (
  <div>
    <CssBaseline />
    <Navbar />
    <main>
      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/movies/:id">
          <MovieInfo />
        </Route>
        <Route exact path="/actor/:id">
          <Actors />
        </Route>
        <Route exact path="/movies">
          <Movie />
        </Route>
        <Route exact path="/profil">
          <Profile />
        </Route>
      </Switch>
    </main>
  </div>
);
export default App;
