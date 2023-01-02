import React, {FunctionComponent, useEffect, useState} from 'react';

import moviesPageStyles from './movies.module.css';

import {SearchForm} from '../../components/search-form/search-form';
import {Preloader} from '../../components/preloader/preloader';
import {MoviesCardList} from '../../components/movies-card-list/movies-card-list';

import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {Popup} from '../../components/popup/popup';
import moviesListStyles from '../../components/movies-card-list/movies-card-list.module.css';
import {popupSlice} from '../../services/state-slices/popup';

export const Movies: FunctionComponent = () => {
  const {moviesDataState, searchFormState, popupState} = useSelector((state) => {
    return state;
  });

  const dispatch = useAppDispatch();
  const actionsPopup = popupSlice.actions;

  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const handleOnOpenPopup = () => {
    setPopupIsOpen(true);
    // document.body.classList.add(moviesListStyles['body-overlay']);
  }

  // TODO: Перенести состояние попапа в хранилище
  const handleOnClosePopup = () => {
    setPopupIsOpen(false);
    // document.body.classList.remove(moviesListStyles['body-overlay']);
  }

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem('lastFoundMovies') || '[]').length === 0) {
  //     dispatch(actionsPopup.setIsOpen())
  //   }
  // }, [searchFormState.value, localStorage])

  return (
    <>
      <SearchForm/>
      {
        !localStorage.key(0) || JSON.parse(localStorage.getItem('lastFoundMovies') || '[]').length === 0
          ? <p className={moviesPageStyles.text}>Начните поиск по ключевому слову</p>
          : searchFormState.isSearching
            ? <Preloader/>
            : popupState.isOpen
              ? <Popup primaryText="Поиск не дал результатов" secondaryText="Попробуйте поискать другой фильм"
                       onClose={handleOnClosePopup}/>
              // : moviesDataState.lastFoundMovies.length === 0
              : <MoviesCardList buttonView='add' movies={moviesDataState.lastFoundMovies}/>
      }
    </>
  )
}