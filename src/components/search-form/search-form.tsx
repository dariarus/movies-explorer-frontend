import React, {ChangeEvent, FunctionComponent, useCallback, useEffect, useState} from 'react';

import searchFormStyles from './search-form.module.css';

import {FormButton} from '../form-button/form-button';
import {FilterCheckbox} from '../filter-checkbox/filter-checkbox';

import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {searchFormSlice} from '../../services/state-slices/search-form';
import {moviesDataSlice, setLastFoundMovies} from '../../services/state-slices/movies-data';
import {setRenderingTimer} from '../../utils/functions';
import {popupSlice} from '../../services/state-slices/popup';

export const SearchForm: FunctionComponent<{handleOpenPopup: () => void}> = (props) => {
  const {moviesDataState, searchFormState, popupState} = useSelector((state) => {
    return state;
  })

  const [value, setValue] = useState<string>('');

  const dispatch = useAppDispatch();

  const actionsMoviesData = moviesDataSlice.actions;
  const actionsSearchForm = searchFormSlice.actions;
  const actionsPopup = popupSlice.actions;

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(actionsSearchForm.setValue(event.target.value));
  }, [dispatch, value]);

  const handleSubmit = useCallback(async () => {
    dispatch(actionsSearchForm.setIsSearching());
    await setRenderingTimer(1000);
    const lastFoundMovies = moviesDataState.moviesData.filter(movie => {
        return movie.nameRU.includes(value) || movie.nameEN.includes(value)
      }
    )
    if (lastFoundMovies.length === 0) {
      props.handleOpenPopup()
    }
      localStorage.setItem('lastFoundMovies', JSON.stringify(lastFoundMovies));
      dispatch(actionsMoviesData.setLastFoundMovies(lastFoundMovies));
      dispatch(actionsSearchForm.setIsSearchingSuccess())

  }, [value])

  return (
    <section className={searchFormStyles.wrapper}>
      <form className={searchFormStyles['search-form']}>
        <input type="text" className={searchFormStyles['search-form__input']} placeholder="Фильм" required
               value={value} onChange={(e) => {
          e.stopPropagation();
          handleChange(e);
        }}/>
        <FormButton name="Поиск" needSearchMod={true} onClick={handleSubmit}/>
      </form>
      <FilterCheckbox/>
      <hr className={searchFormStyles.decor}/>
    </section>
  )
}