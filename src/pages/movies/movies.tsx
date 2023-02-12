import React, {FunctionComponent, useEffect} from 'react';

import moviesPageStyles from './movies.module.css';

import {SearchForm} from '../../components/search-form/search-form';
import {Preloader} from '../../components/preloader/preloader';
import {MoviesCardList} from '../../components/movies-card-list/movies-card-list';
import {Popup} from '../../components/popup/popup';

import {useAppDispatch, useSelector} from '../../services/types/hooks';

import {popupActions} from '../../services/state-slices/popup';
import {ButtonView, MoviesPageType} from '../../services/types/props-types';
import {getSavedMoviesData} from '../../services/actions/main-api/saved-movies';

export const Movies: FunctionComponent = () => {
  const {moviesDataState, searchFormState, popupState} = useSelector((state) => {
    return state;
  });

  const dispatch = useAppDispatch();

  const handleOnClosePopup = () => {
    dispatch(popupActions.setIsClosed());
    document.body.classList.remove(moviesPageStyles['body-overlay']);
  }

  useEffect(() => {
    dispatch(getSavedMoviesData());
  }, [])

  return (
    <>
      <SearchForm moviesArray={moviesDataState.moviesData} moviesPageType={MoviesPageType.MOVIES}/>
      {
        searchFormState.isSearching
          ? <Preloader/>
          : JSON.parse(localStorage.getItem('lastFoundMovies') || '[]').length === 0
            ? <p className={moviesPageStyles.text}>Начните поиск по ключевому слову</p>
            : <MoviesCardList buttonView={ButtonView.ADD} moviesPageType={MoviesPageType.MOVIES}
                              movies={moviesDataState.lastFoundMovies}/>

      }

      {
        popupState.notFoundMoviesType.show &&
        <Popup primaryText="Поиск не дал результатов" secondaryText="Попробуйте поискать другой фильм"
               onClose={handleOnClosePopup}/>
      }
    </>
  )
}