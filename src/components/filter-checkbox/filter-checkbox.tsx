import React, {FunctionComponent} from 'react';

import checkboxStyles from './filter-checkbox.module.css';

import {filterCheckboxActions} from '../../services/state-slices/filter-checkbox';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {MoviesPageType} from '../../services/types/props-types';

export const FilterCheckbox: FunctionComponent<{ moviesPageType: string }> = (props) => {
  const {filterCheckboxState} = useSelector((state) => {
    return state;
  })

  const dispatch = useAppDispatch();

  const isChecked = props.moviesPageType === MoviesPageType.MOVIES
    ? filterCheckboxState.isCheckedOnMoviesPage
    : filterCheckboxState.isCheckedOnSavedMoviesPage

  const handleOnInputClick = () => {
    if (props.moviesPageType === MoviesPageType.MOVIES) {
      dispatch(filterCheckboxActions.toggleIsCheckedOnMoviesPage());
    } else {
      dispatch(filterCheckboxActions.toggleIsCheckedOnSavedMoviesPage());
    }
  }

  return (
    <div className={checkboxStyles.checkbox}>
      <label className={checkboxStyles['checkbox__switch']}>
        <input type="checkbox" className={checkboxStyles['checkbox__input']}
               checked={isChecked}
               onChange={handleOnInputClick}/>
        <span className={`${checkboxStyles['checkbox__slider']} ${checkboxStyles['checkbox__round']}`}></span>
      </label>
      <p className={isChecked
        ? `${checkboxStyles['checkbox__name']}`
        : `${checkboxStyles['checkbox__name']} ${checkboxStyles['checkbox__name_inactive']}`}>
        Короткометражки
      </p>
    </div>
  )
}