import React, {FunctionComponent, useState} from 'react';

import checkboxStyles from './filter-checkbox.module.css';
import {filterCheckboxActions} from '../../services/state-slices/filter-checkbox';
import {useAppDispatch, useSelector} from '../../services/types/hooks';

export const FilterCheckbox: FunctionComponent = () => {
  const {filterCheckboxState} = useSelector((state) => {
    return state;
  })

  const dispatch = useAppDispatch();

  const handleOnInputClick = () => {
    dispatch(filterCheckboxActions.toggleIsChecked())
  }

  return (
    <div className={checkboxStyles.checkbox}>
      <label className={checkboxStyles['checkbox__switch']}>
        <input type="checkbox" className={checkboxStyles['checkbox__input']} checked={filterCheckboxState.isChecked}
               onChange={handleOnInputClick}/>
        <span className={`${checkboxStyles['checkbox__slider']} ${checkboxStyles['checkbox__round']}`}></span>
      </label>
      <p className={filterCheckboxState.isChecked
        ? `${checkboxStyles['checkbox__name']}`
        : `${checkboxStyles['checkbox__name']} ${checkboxStyles['checkbox__name_inactive']}`}>
        Короткометражки
      </p>
    </div>
  )
}