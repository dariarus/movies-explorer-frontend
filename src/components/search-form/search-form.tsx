import React, {ChangeEvent, FunctionComponent, useCallback, useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';

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
import {getMoviesDataFromSideApi} from '../../services/actions/movies-api';
import {store} from '../../services/store';
import {renderingTime} from '../../utils/constants';

export const SearchForm: FunctionComponent<{ moviesArray: Array<TMovieItem | TSavedMovieItem>, moviesPageType: MoviesPageType }> = (props) => {

  const {moviesDataState, searchFormState} = useSelector((state) => {
    return state;
  })

  const initialInputValue = props.moviesPageType === MoviesPageType.MOVIES && searchFormState.lastSearchedValue
    ? searchFormState.lastSearchedValue
    : ''

  const [inputValue, setInputValue] = useState<string>(initialInputValue);

  const dispatch = useAppDispatch();

  const {register, control, handleSubmit, formState: {errors}} = useForm<IFormInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  let lastFoundMovies: Array<TMovieItem | TSavedMovieItem> = [];

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    dispatch(searchFormActions.setValue(event.target.value));
  }, [dispatch, inputValue]);

  const onSubmit = useCallback(async () => {

    if (!store.getState().moviesDataState.moviesDataIsLoaded) {
      dispatch(getMoviesDataFromSideApi());
    }

    dispatch(searchFormActions.setIsSearching());

    await setRenderingTimer(renderingTime);

    // проверка типа страницы: сохраненные фильмы или все
    if (props.moviesPageType === MoviesPageType.MOVIES) {
      dispatch(moviesDataActions.filterLastFoundMovies(inputValue));
      localStorage.setItem('lastSearchRequest', JSON.stringify(inputValue));
      dispatch(searchFormActions.setLastSearchedValue(inputValue));
      dispatch(popupActions.getLastFoundMoviesToOpenPopup(store.getState().moviesDataState.lastFoundMovies));
    } else {
      dispatch(savedMoviesDataActions.filterLastFoundSavedMovies(inputValue));
      dispatch(searchFormActions.setLastSearchedValueOfSaved(inputValue));
      dispatch(popupActions.getLastFoundMoviesToOpenPopup(store.getState().savedMoviesDataState.lastFoundSavedMovies));
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
        <Controller
          control={control}
          name="search"
          render={({
                     field: {onChange, onBlur, value, name, ref},
                     fieldState: {invalid, isTouched, isDirty, error},
                     formState,
                   }) => (
            <input type="text" value={inputValue} required placeholder="Фильм" disabled={searchFormState.isSearching}
                   className={errors.search
                     ? `${searchFormStyles['search-form__input']} ${searchFormStyles['search-form__input_errored']}`
                     : `${searchFormStyles['search-form__input']}`}
                   {...register('search', setOptionsForInputValidation('search'))}
                   onChange={(e:ChangeEvent<HTMLInputElement>) => {
                     e.stopPropagation();
                     handleChange(e);
                     onChange(e.target.value);
                   }}/>
          )}/>
        <FormButton name="Поиск" needSearchMod={true} onClick={handleSubmit(onSubmit)}
                    disabled={searchFormState.isSearching}/>
      </form>
      {
        errors.search &&
        <p className={searchFormStyles['search-form__error-message']}>{errors.search?.message}</p>
      }
      <div className={searchFormStyles.info}>
        <FilterCheckbox moviesPageType={props.moviesPageType}/>
      </div>
      <hr className={searchFormStyles.decor}/>
    </section>
  )
}