import React, {FunctionComponent, useEffect} from 'react';

import savedMoviesPageStyles from './saved-movies.module.css';

import {SearchForm} from '../../components/search-form/search-form';
import {MoviesCardList} from '../../components/movies-card-list/movies-card-list';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {popupActions} from '../../services/state-slices/popup';
import {Preloader} from '../../components/preloader/preloader';
import {Popup} from '../../components/popup/popup';
import {ButtonView, MoviesPageType} from '../../services/types/props-types';
import {savedMoviesDataActions} from '../../services/state-slices/saved-movies-data';
import {TMovieItem, TSavedMovieItem} from '../../services/types/data';

export const SavedMovies: FunctionComponent = () => {
  const {searchFormState, savedMoviesDataState, popupState} = useSelector((state) => {
    return state;
  })

  const dispatch = useAppDispatch();

  const renderingMovies: Array<TSavedMovieItem> = JSON.parse(localStorage.getItem('lastFoundSavedMovies') || '[]').length === 0
    ? savedMoviesDataState.savedMoviesData
    : savedMoviesDataState.lastFoundSavedMovies

  const handleOnOpenPopup = (popupType: string) => {
    dispatch(popupActions.setIsOpen({
      [popupType]: true
    }));
    document.body.classList.add(savedMoviesPageStyles['body-overlay']);
  }

  const handleOnClosePopup = () => {
    dispatch(popupActions.setIsClosed());
    document.body.classList.remove(savedMoviesPageStyles['body-overlay']);
  }

  return (
    <>
      <SearchForm moviesArray={savedMoviesDataState.savedMoviesData}
                  handleOpenPopup={() => {
                    if (searchFormState.hasError) {
                      handleOnOpenPopup('errorPopupIsOpened')
                    }
                    if (savedMoviesDataState.lastFoundSavedMovies.length === 0) {
                      handleOnOpenPopup('nothingFoundPopupIsOpened')
                    }
                  }
                  }/>
      {
        searchFormState.isSearching
          ? <Preloader/>
          : savedMoviesDataState.savedMoviesData.length === 0
            ? <p className={savedMoviesPageStyles.text}>Вы пока ничего не сохранили</p>
            : <MoviesCardList buttonView={ButtonView.DELETE} moviesPageType={MoviesPageType.SAVED_MOVIES}
                              movies={renderingMovies}/>

      }

      {
        popupState.foundMovies.show &&
        <Popup primaryText="Поиск не дал результатов" secondaryText="Попробуйте поискать другой фильм"
               onClose={handleOnClosePopup}/>
      }
      {
        popupState.popupTypesToOpen.errorPopupIsOpened &&
        <Popup primaryText="Что-то пошло не так :(" secondaryText="Попробуйте повторить действие"
               onClose={handleOnClosePopup}/>
      }
    </>
  )
}