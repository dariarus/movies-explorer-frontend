import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import appStyles from './app.module.css';

import {Main} from '../../pages/main/main';
import {Movies} from '../../pages/movies/movies';
import {SavedMovies} from '../../pages/saved-movies/saved-movies';
import {Register} from '../../pages/register/register';
import {Login} from '../../pages/login/login';
import {Profile} from '../../pages/profile/profile';
import {NotFound404} from '../../pages/not-found-404/not-found-404';

function App() {
  return (
    <BrowserRouter basename="/movies-explorer">
      <main className={appStyles.main}>
        <Switch>
          <Route path="/movies" exact={true}>
            <Movies/>
          </Route>
          <Route path="/saved-movies" exact={true}>
            <SavedMovies/>
          </Route>
          <Route path="/signup" exact={true}>
            <Register/>
          </Route>
          <Route path="/signin" exact={true}>
            <Login/>
          </Route>
          <Route path="/profile" exact={true}>
            <Profile/>
          </Route>
          <Route path="/" exact={true}>
            <Main/>
          </Route>
          <Route>
            <NotFound404/>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
