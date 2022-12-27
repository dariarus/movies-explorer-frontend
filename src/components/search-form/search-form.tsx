import React, {ChangeEvent, FunctionComponent, useCallback, useEffect, useState} from 'react';

import searchFormStyles from './search-form.module.css';

import {FormButton} from '../form-button/form-button';
import {FilterCheckbox} from '../filter-checkbox/filter-checkbox';

import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {searchFormSlice} from '../../services/state-slices/search-form';
import {moviesDataSlice} from '../../services/state-slices/movies-data';

export const SearchForm: FunctionComponent = () => {
  const {moviesDataState} = useSelector((state) => {
    return state;
  })

  const [value, setValue] = useState<string>('');

  const dispatch = useAppDispatch();

  const actionsMoviesData = moviesDataSlice.actions;
  const actionsSearchForm = searchFormSlice.actions;

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(actionsSearchForm.setValue(event.target.value));
  }, [dispatch, value]);

  const handleSubmit = useCallback(() => {
    const foundMovies = moviesDataState.moviesData.filter(movie => {
        return movie.nameRU.toLowerCase().includes(value) || movie.nameEN.toLowerCase().includes(value)
      }
    )
    dispatch(actionsMoviesData.setFoundMovies(foundMovies));
  }, [dispatch, moviesDataState.moviesData, value])

  useEffect(() => {
    localStorage.setItem('moviesHasBeenFound', JSON.stringify(moviesDataState.foundMovies));
  }, [moviesDataState.foundMovies])

  return (
    <section className={searchFormStyles.wrapper}>
      <form className={searchFormStyles['search-form']}>
        <input type="text" className={searchFormStyles['search-form__input']} placeholder="Фильм" required
               value={value} onChange={(e) => {
          handleChange(e);
        }}/>
        <FormButton name="Поиск" needSearchMod={true} onClick={handleSubmit}/>
      </form>
      <FilterCheckbox/>
      <hr className={searchFormStyles.decor}/>
    </section>
  )
}