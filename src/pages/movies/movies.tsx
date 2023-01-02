import React, {FunctionComponent, useEffect, useState} from 'react';

import moviesPageStyles from './movies.module.css';

import {SearchForm} from '../../components/search-form/search-form';
import {Preloader} from '../../components/preloader/preloader';
import {MoviesCardList} from '../../components/movies-card-list/movies-card-list';

import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {Popup} from '../../components/popup/popup';

import {popupActions} from '../../services/state-slices/popup';
import {searchFormActions} from '../../services/state-slices/search-form';

export const Movies: FunctionComponent = () => {
  const {moviesDataState, searchFormState, popupState} = useSelector((state) => {
    return state;
  });

  const dispatch = useAppDispatch();
  // const actionsPopup = popupSlice.actions;
  // const actionsSearchForm = searchFormSlice.actions;

  // const [popupIsOpen, setPopupIsOpen] = useState(false);

  const handleOnOpenPopup = (popupType: string) => {
    // setPopupIsOpen(true);
    dispatch(popupActions.setIsOpen({
      [popupType]: true
    }));
    document.body.classList.add(moviesPageStyles['body-overlay']);
  }

  const handleOnClosePopup = () => {
    // setPopupIsOpen(false);
    dispatch(popupActions.setIsClosed());
    document.body.classList.remove(moviesPageStyles['body-overlay']);
  }

  useEffect(() => {
    dispatch(searchFormActions.setSearchingIsFailed());
    // dispatch(popupActions.setIsOpen({
    //   errorPopupIsOpened: true
    // }));
  }, [moviesDataState.hasError])

  return (
    <>
      {
        popupState.popupTypesToOpen.nothingFoundPopupIsOpened &&
        <Popup primaryText="Поиск не дал результатов" secondaryText="Попробуйте поискать другой фильм"
               onClose={handleOnClosePopup}/>
      }
      {
        popupState.popupTypesToOpen.errorPopupIsOpened &&
        <Popup primaryText="Что-то пошло не так :(" secondaryText="Попробуйте повторить действие" onClose={handleOnClosePopup}/>
      }

      <SearchForm handleOpenPopup={() => {
        if (searchFormState.hasError) {
          handleOnOpenPopup('errorPopupIsOpened')
        }
        if (moviesDataState.lastFoundMovies.length === 0) {
          handleOnOpenPopup('nothingFoundPopupIsOpened')
        }
      }}/>
      {
        searchFormState.isSearching
          ? <Preloader/>
          : !localStorage.key(0) || JSON.parse(localStorage.getItem('lastFoundMovies') || '[]').length === 0
            ? <p className={moviesPageStyles.text}>Начните поиск по ключевому слову</p>
            : <MoviesCardList buttonView='add' movies={moviesDataState.lastFoundMovies}/>

      }
    </>
  )
}