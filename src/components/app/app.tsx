import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import appStyles from './app.module.css';

import {Main} from '../../pages/main';
import {Movies} from '../../pages/movies';
import {SavedMovies} from '../../pages/saved-movies';
import {Register} from '../../pages/register';
import {Login} from '../../pages/login';
import {Profile} from '../../pages/profile/profile';
import {NotFound404} from '../../pages/not-found-404/not-found-404';
import {Header} from '../header/header';
import {Footer} from '../footer/footer';

function App() {
  return (
    <BrowserRouter basename="/movies-explorer">
      <main className={appStyles.main}>
        <Switch>
          <Route path="/" exact={true}>
            <Main/>
          </Route>
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
          <Route>
            <NotFound404/>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
