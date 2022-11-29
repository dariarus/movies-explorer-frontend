import React from 'react';

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
    <>
      <Header/>
      <main className={appStyles.main}>
        {/*<Main/>*/}
        {/*<Movies/>*/}
        {/*<SavedMovies/>*/}
        {/*<Register/>*/}
        {/*<Login/>*/}
        {/*<Profile/>*/}
        <NotFound404/>
        {/*<main className="pt-10 pb-10">*/}
        {/*  <Switch location={background || location}>*/}
      </main>
      <Footer/>
    </>
  );
}

export default App;
