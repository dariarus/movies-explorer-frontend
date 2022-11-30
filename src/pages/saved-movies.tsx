import React, {FunctionComponent} from 'react';
import {SearchForm} from '../components/search-form/search-form';
import {MoviesCardList} from '../components/movies-card-list/movies-card-list';
import {Header} from '../components/header/header';
import {Footer} from '../components/footer/footer';

export const SavedMovies: FunctionComponent = () => {
  return (
    <>
      <Header/>
      <SearchForm />
      <MoviesCardList buttonView='delete'/>
      <Footer/>
    </>
  )
}