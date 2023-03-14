import React, {FunctionComponent, useEffect} from 'react';

import savedMoviesPageStyles from './saved-movies.module.css';

import {SearchForm} from '../../components/search-form/search-form';
import {MoviesCardList} from '../../components/movies-card-list/movies-card-list';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {popupActions} from '../../services/state-slices/popup';
import {Preloader} from '../../components/preloader/preloader';
import {Popup} from '../../components/popup/popup';
import {ButtonView, MoviesPageType} from '../../services/types/props-types';
import {TSavedMovieItem} from '../../services/types/data';
import {getSavedMoviesData} from '../../services/actions/main-api/saved-movies';
import {filterCheckboxActions} from '../../services/state-slices/filter-checkbox';

export const SavedMovies: FunctionComponent = () => {
  const {searchFormState, savedMoviesDataState, popupState} = useSelector((state) => {
    return state;
  })

  const dispatch = useAppDispatch();

  const renderingMovies: Array<TSavedMovieItem> = searchFormState.lastSearchedValueOfSaved
    ? savedMoviesDataState.lastFoundSavedMovies
    : savedMoviesDataState.savedMoviesData

  const handleOnClosePopup = () => {
    dispatch(popupActions.setIsClosed());
    document.body.classList.remove(savedMoviesPageStyles['body-overlay']);
  }

  useEffect(() => {
    dispatch(getSavedMoviesData());
    return () => {
      dispatch(filterCheckboxActions.setIsCheckedOnSavedMoviesPage(false))
      localStorage.removeItem('lastFilterCheckboxStateOnSavedMoviesPage');
    }
  }, [])

  return (
    <>
      <SearchForm moviesArray={savedMoviesDataState.savedMoviesData} moviesPageType={MoviesPageType.SAVED_MOVIES}/>
      {
        searchFormState.isSearching
          ? <Preloader/>
          : savedMoviesDataState.savedMoviesData.length === 0
            ? <p className={savedMoviesPageStyles.text}>Вы пока ничего не сохранили</p>
            : <MoviesCardList buttonView={ButtonView.DELETE} moviesPageType={MoviesPageType.SAVED_MOVIES}
                              movies={renderingMovies}/>

      }

      {
        popupState.notFoundMoviesType.show &&
        <Popup primaryText="Поиск не дал результатов" secondaryText="Попробуйте поискать другой фильм"
               onClose={handleOnClosePopup}/>
      }
    </>
  )
}