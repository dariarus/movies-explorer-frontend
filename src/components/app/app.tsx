import React from 'react';

import appStyles from './app.module.css';

import {Main} from '../../pages/main';
import {Movies} from '../../pages/movies';
import {SavedMovies} from '../../pages/saved-movies';

function App() {
  return (
    <div className={appStyles.main}>
      {/*<Main/>*/}
      {/*<Movies/>*/}
      <SavedMovies/>
      {/*<main className="pt-10 pb-10">*/}
      {/*  <Switch location={background || location}>*/}
    </div>
  );
}

export default App;
