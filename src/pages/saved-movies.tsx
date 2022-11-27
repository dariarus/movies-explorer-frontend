import React, {FunctionComponent} from 'react';
import {SearchForm} from '../components/search-form/search-form';
import {MoviesCardList} from '../components/movies-card-list/movies-card-list';

export const SavedMovies: FunctionComponent = () => {
  return (
    <>
      <SearchForm />
      <MoviesCardList buttonView='delete'/>
    </>
  )
}