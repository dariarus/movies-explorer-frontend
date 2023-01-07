import React, {FunctionComponent, useEffect} from 'react';
import {SearchForm} from '../../components/search-form/search-form';
import {MoviesCardList} from '../../components/movies-card-list/movies-card-list';
import {getSavedMoviesData} from '../../services/actions/main-api';
import {useAppDispatch, useSelector} from '../../services/types/hooks';

export const SavedMovies: FunctionComponent = () => {
  const {moviesDataState} = useSelector((state) => {
    return state;
  })
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSavedMoviesData());
  }, [])

  return (
    <>
      <SearchForm handleOpenPopup={() => 'bla'}/>
      <MoviesCardList buttonView='delete' movies={moviesDataState.savedMovies}/>
    </>
  )
}