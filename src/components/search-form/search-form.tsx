import React, {ChangeEvent, FunctionComponent, useCallback, useEffect, useState} from 'react';

import searchFormStyles from './search-form.module.css';

import {FormButton} from '../form-button/form-button';
import {FilterCheckbox} from '../filter-checkbox/filter-checkbox';

import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {searchFormActions} from '../../services/state-slices/search-form';
import {moviesDataActions} from '../../services/state-slices/movies-data';
import {isArrayOfSavedMovies, setRenderingTimer} from '../../utils/functions';
import {TMovieItem, TSavedMovieItem} from '../../services/types/data';
import {savedMoviesDataActions} from '../../services/state-slices/saved-movies-data';
import {popupActions} from '../../services/state-slices/popup';

export const SearchForm: FunctionComponent<{
  moviesArray: Array<TMovieItem | TSavedMovieItem>,
  handleOpenPopup: () => void
}> = (props) => {

  const {moviesDataState, popupState} = useSelector((state) => {
    return state;
  })

  const [value, setValue] = useState<string>('');

  const dispatch = useAppDispatch();

  let lastFoundMovies: Array<TMovieItem | TSavedMovieItem> = [];

  const getLastFoundMovies = () => {
    return props.moviesArray.filter(movie => {
        return movie.nameRU.toLowerCase().includes(value.toLowerCase()) || movie.nameEN.toLowerCase().includes(value.toLowerCase())
      }
    )
  }

  // const handleOpenPopup = useCallback(() => {
  //   if (popupState.lastFoundMovies.length === 0) {
  //     props.handleOpenPopup();
  //   }
  // }, [lastFoundMovies.length === 0])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(searchFormActions.setValue(event.target.value));
  }, [dispatch, value]);

  const handleSubmit = useCallback(async () => {
    dispatch(searchFormActions.setIsSearching());

    await setRenderingTimer(1000);

    lastFoundMovies = getLastFoundMovies()
    // dispatch(popupActions.getLastFoundMoviesToOpenPopup(lastFoundMovies));
    // if (popupState.lastFoundMovies.length === 0) {
    //   props.handleOpenPopup()
    // }

    // if (lastFoundMovies.length === 0) {
    //   props.handleOpenPopup()
    // }


    // проверка типа входящего массива: сохраненные фильмы или все
    if (isArrayOfSavedMovies(props.moviesArray)) {
      localStorage.setItem('lastFoundSavedMovies', JSON.stringify(lastFoundMovies));
      dispatch(savedMoviesDataActions.setLastFoundSavedMovies(lastFoundMovies as Array<TSavedMovieItem>));
      dispatch(popupActions.getLastFoundMoviesToOpenPopup(lastFoundMovies));
    } else {
      localStorage.setItem('lastFoundMovies', JSON.stringify(lastFoundMovies));
      dispatch(moviesDataActions.setLastFoundMovies(lastFoundMovies));
      dispatch(popupActions.getLastFoundMoviesToOpenPopup(lastFoundMovies));
    }

    dispatch(searchFormActions.setIsSearchingSuccess())
  }, [lastFoundMovies])

  useEffect(() => {
    if (moviesDataState.hasError) {
      dispatch(searchFormActions.setSearchingIsFailed());
    }
  }, [moviesDataState.hasError])

  return (
    <section className={searchFormStyles.wrapper}>
      <form className={searchFormStyles['search-form']}>
        <input type="text" className={searchFormStyles['search-form__input']} placeholder="Фильм" required
               value={value} onChange={(e) => {
          e.stopPropagation();
          handleChange(e);
        }}/>
        <FormButton name="Поиск" disabled={value !== '' ? false : true} needSearchMod={true} onClick={handleSubmit}/>
      </form>
      <FilterCheckbox/>
      <hr className={searchFormStyles.decor}/>
    </section>
  )
}