import React, {ChangeEvent, FunctionComponent, useCallback, useEffect, useState} from 'react';

import searchFormStyles from './search-form.module.css';

import {FormButton} from '../form-button/form-button';
import {FilterCheckbox} from '../filter-checkbox/filter-checkbox';

import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {searchFormActions} from '../../services/state-slices/search-form';
import {moviesDataActions} from '../../services/state-slices/movies-data';
import {setOptionsForInputValidation, setRenderingTimer} from '../../utils/functions';
import {TMovieItem, TSavedMovieItem} from '../../services/types/data';
import {savedMoviesDataActions} from '../../services/state-slices/saved-movies-data';
import {popupActions} from '../../services/state-slices/popup';
import {IFormInputs, MoviesPageType} from '../../services/types/props-types';
import {useForm} from 'react-hook-form';
import {getMoviesDataFromSideApi} from '../../services/actions/movies-api';
import {store} from '../../services/store';

export const SearchForm: FunctionComponent<{ moviesArray: Array<TMovieItem | TSavedMovieItem>, moviesPageType: MoviesPageType }> = (props) => {

  const {moviesDataState, searchFormState} = useSelector((state) => {
    return state;
  })

  const initialInputValue = props.moviesPageType === MoviesPageType.MOVIES && searchFormState.lastSearchedValue
    ? searchFormState.lastSearchedValue
    : props.moviesPageType === MoviesPageType.SAVED_MOVIES && searchFormState.lastSearchedValueOfSaved
      ? searchFormState.lastSearchedValueOfSaved
      : ''

  const [value, setValue] = useState<string>(initialInputValue);

  const dispatch = useAppDispatch();

  const {handleSubmit, register, formState: {errors}} = useForm<IFormInputs>();

  let lastFoundMovies: Array<TMovieItem | TSavedMovieItem> = [];

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(searchFormActions.setValue(event.target.value));
  }, [dispatch, value]);

  const onSubmit = useCallback(async () => {

    if (!store.getState().moviesDataState.moviesDataIsLoaded) {
      dispatch(getMoviesDataFromSideApi());
    }

    dispatch(searchFormActions.setIsSearching());

    await setRenderingTimer(1000);

    // проверка типа страницы: сохраненные фильмы или все
    if (props.moviesPageType === MoviesPageType.SAVED_MOVIES) {
      dispatch(savedMoviesDataActions.filterLastFoundSavedMovies(value))
      localStorage.setItem('lastSearchRequestOfSaved', JSON.stringify(value));
      dispatch(searchFormActions.setLastSearchedValueOfSaved(value));
      dispatch(popupActions.getLastFoundMoviesToOpenPopup(store.getState().savedMoviesDataState.lastFoundSavedMovies));

    } else {
      dispatch(moviesDataActions.filterLastFoundMovies(value));
      localStorage.setItem('lastSearchRequest', JSON.stringify(value));
      dispatch(searchFormActions.setLastSearchedValue(value));
      dispatch(popupActions.getLastFoundMoviesToOpenPopup(store.getState().moviesDataState.lastFoundMovies));
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
        <input type="text" value={value} required placeholder="Фильм" disabled={searchFormState.isSearching}
               className={errors.search
                 ? `${searchFormStyles['search-form__input']} ${searchFormStyles['search-form__input_errored']}`
                 : `${searchFormStyles['search-form__input']}`}
               {...register('search', setOptionsForInputValidation('search'))}
               onChange={(e) => {
                 e.stopPropagation();
                 handleChange(e);
               }}/>
        <FormButton name="Поиск" needSearchMod={true} onClick={handleSubmit(onSubmit)}
                    disabled={searchFormState.isSearching}/>
      </form>
      {
        errors.search &&
        <p className={searchFormStyles['search-form__error-message']}>{errors.search?.message}</p>
      }
      <div className={searchFormStyles.info}>
        <FilterCheckbox/>
      </div>
      <hr className={searchFormStyles.decor}/>
    </section>
  )
}