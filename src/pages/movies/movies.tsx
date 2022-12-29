import React, {FunctionComponent} from 'react';

import moviesPageStyles from './movies.module.css';

import {SearchForm} from '../../components/search-form/search-form';
import {Preloader} from '../../components/preloader/preloader';
import {MoviesCardList} from '../../components/movies-card-list/movies-card-list';

import {useSelector} from '../../services/types/hooks';

export const Movies: FunctionComponent = () => {
  const {moviesDataState, searchFormState} = useSelector((state) => {
    return state;
  })

  return (
    <>
      <SearchForm/>
      {
        moviesDataState.lastFoundMovies.length === 0 ?
          <p className={moviesPageStyles.text}>Начните поиск по ключевому слову</p>
          :
          searchFormState.isSearching
            ? <Preloader/>
            : <MoviesCardList buttonView='add' movies={moviesDataState.lastFoundMovies}/>
      }
    </>
  )
}