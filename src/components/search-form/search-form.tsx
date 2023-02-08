import React, {ChangeEvent, FunctionComponent, useCallback, useEffect, useState} from 'react';

import searchFormStyles from './search-form.module.css';

import {FormButton} from '../form-button/form-button';
import {FilterCheckbox} from '../filter-checkbox/filter-checkbox';

import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {searchFormActions} from '../../services/state-slices/search-form';
import {moviesDataActions} from '../../services/state-slices/movies-data';
import {isArrayOfSavedMovies, setOptionsForInputValidation, setRenderingTimer} from '../../utils/functions';
import {TMovieItem, TSavedMovieItem} from '../../services/types/data';
import {savedMoviesDataActions} from '../../services/state-slices/saved-movies-data';
import {popupActions} from '../../services/state-slices/popup';
import {IFormInputs, MoviesPageType} from '../../services/types/props-types';
import {useForm} from 'react-hook-form';
import profileStyles from '../../pages/profile/profile.module.css';

export const SearchForm: FunctionComponent<{ moviesArray: Array<TMovieItem | TSavedMovieItem>, moviesPageType: MoviesPageType }> = (props) => {

  const {moviesDataState, searchFormState} = useSelector((state) => {
    return state;
  })

  const [value, setValue] = useState<string>('');

  const dispatch = useAppDispatch();

  const {handleSubmit, register, formState: {errors}} = useForm<IFormInputs>({
    mode: 'all',
    // reValidateMode: 'onChange'
  });

  let lastFoundMovies: Array<TMovieItem | TSavedMovieItem> = [];
  let lastSearch: string = '';

  const getLastFoundMovies = () => {
    return props.moviesArray.filter(movie => {
        return movie.nameRU.toLowerCase().includes(value.toLowerCase()) || movie.nameEN.toLowerCase().includes(value.toLowerCase())
      }
    )
  }

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(searchFormActions.setValue(event.target.value));
  }, [dispatch, value]);

  const onSubmit = useCallback(async () => {
    dispatch(searchFormActions.setIsSearching());

    await setRenderingTimer(1000);

    lastFoundMovies = getLastFoundMovies();

    // проверка типа входящего массива: сохраненные фильмы или все
    if (isArrayOfSavedMovies(props.moviesArray)) {
      //   localStorage.setItem('lastFoundSavedMovies', JSON.stringify(lastFoundMovies));
      dispatch(savedMoviesDataActions.setLastFoundSavedMovies(lastFoundMovies as Array<TSavedMovieItem>));

      localStorage.setItem('lastSearchRequestOfSaved', JSON.stringify(value));
      dispatch(searchFormActions.setLastSearchedValueOfSaved(value));

      dispatch(popupActions.getLastFoundMoviesToOpenPopup(lastFoundMovies));
    } else {
      localStorage.setItem('lastFoundMovies', JSON.stringify(lastFoundMovies));
      dispatch(moviesDataActions.setLastFoundMovies(lastFoundMovies));

      localStorage.setItem('lastSearchRequest', JSON.stringify(value));
      dispatch(searchFormActions.setLastSearchedValue(value));

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
        <input type="text" value={value} required placeholder="Фильм"
               className={errors.search
                 ? `${searchFormStyles['search-form__input']} ${searchFormStyles['search-form__input_errored']}`
                 : `${searchFormStyles['search-form__input']}`}
               {...register('search', setOptionsForInputValidation('search'))}
               onChange={(e) => {
                 e.stopPropagation();
                 handleChange(e);
               }}/>
        <FormButton name="Поиск" needSearchMod={true} onClick={handleSubmit(onSubmit)}/>
      </form>
      {
        errors.search &&
        <p className={searchFormStyles['search-form__error-message']}>{errors.search?.message}</p>
      }
      <div className={searchFormStyles.info}>
        <FilterCheckbox/>
        <p className={searchFormStyles['info__text']}>Ваш последний запрос:
          {
            props.moviesPageType === MoviesPageType.SAVED_MOVIES &&
            <span className={searchFormState.lastSearchedValueOfSaved
              ? `${searchFormStyles['info__text']} ${searchFormStyles['info__text_bold']}`
              : `${searchFormStyles['info__text']} ${searchFormStyles['info__text_secondary']}`}>
            {searchFormState.lastSearchedValueOfSaved ? searchFormState.lastSearchedValueOfSaved : 'Вы пока ничего не искали'}
          </span>
          }
          {
            props.moviesPageType === MoviesPageType.MOVIES &&
            <span className={searchFormState.lastSearchedValue
              ? `${searchFormStyles['info__text']} ${searchFormStyles['info__text_bold']}`
              : `${searchFormStyles['info__text']} ${searchFormStyles['info__text_secondary']}`}>
            {searchFormState.lastSearchedValue ? searchFormState.lastSearchedValue : 'Вы пока ничего не искали'}
          </span>
          }
        </p>
      </div>
      <hr className={searchFormStyles.decor}/>
    </section>
  )
}