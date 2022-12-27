import React, {FunctionComponent, useEffect, useState} from 'react';

import moviesPageStyles from './movies.module.css';

import {SearchForm} from '../../components/search-form/search-form';
import {Preloader} from '../../components/preloader/preloader';
import {MoviesCardList} from '../../components/movies-card-list/movies-card-list';

import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {moviesDataSlice} from '../../services/state-slices/movies-data';
import {TMovie} from '../../services/types/props-types';
import {getMoviesDataFromSideApi} from '../../services/actions/movies-api';

export const Movies: FunctionComponent = () => {
  // TODO: поменять на стейт фильмов, которые уже искались
  const {searchFormState} = useSelector((state) => {
    return state;
  })

  const {moviesDataState} = useSelector(state => {
    return state
  });

  const dispatch = useAppDispatch();

  const actionsMoviesData = moviesDataSlice.actions;

  return (
    <>
      <SearchForm/>
      {
        searchFormState.value === '' ?
          <p className={moviesPageStyles.text}>Начните поиск по ключевому слову</p>
          :
          searchFormState.isSearching
            ? <Preloader/>
            : <MoviesCardList buttonView='add'/>
      }
    </>
  )
}