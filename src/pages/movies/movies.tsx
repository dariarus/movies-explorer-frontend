import React, {FunctionComponent, useEffect, useState} from 'react';

import moviesPageStyles from './movies.module.css';

import {SearchForm} from '../../components/search-form/search-form';
import {Preloader} from '../../components/preloader/preloader';
import {MoviesCardList} from '../../components/movies-card-list/movies-card-list';
import {Popup} from '../../components/popup/popup';

import {useAppDispatch, useSelector} from '../../services/types/hooks';

import {popupActions} from '../../services/state-slices/popup';

export const Movies: FunctionComponent = () => {
  const {moviesDataState, searchFormState, popupState} = useSelector((state) => {
    return state;
  });

  const dispatch = useAppDispatch();

  const handleOnOpenPopup = (popupType: string) => {
    dispatch(popupActions.setIsOpen({
      [popupType]: true
    }));
    document.body.classList.add(moviesPageStyles['body-overlay']);
  }

  const handleOnClosePopup = () => {
    dispatch(popupActions.setIsClosed());
    document.body.classList.remove(moviesPageStyles['body-overlay']);
  }

  return (
    <>
      <SearchForm moviesArray={moviesDataState.moviesData}
                  handleOpenPopup={() => {
                    if (searchFormState.hasError) {
                      handleOnOpenPopup('errorPopupIsOpened');
                    } else if (moviesDataState.lastFoundMovies.length === 0) {
                      handleOnOpenPopup('nothingFoundPopupIsOpened');
                    }
                  }}/>
      {
        searchFormState.isSearching
          ? <Preloader/>
          : !localStorage.key(0) || JSON.parse(localStorage.getItem('lastFoundMovies') || '[]').length === 0
            ? <p className={moviesPageStyles.text}>Начните поиск по ключевому слову</p>
            : <MoviesCardList buttonView='add' movies={moviesDataState.lastFoundMovies}/>

      }

      {
        popupState.popupTypesToOpen.nothingFoundPopupIsOpened &&
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