import React, {FunctionComponent} from 'react';

import checkboxStyles from './filter-checkbox.module.css';

export const FilterCheckbox: FunctionComponent = () => {
  return (
    <div className={checkboxStyles.checkbox}>
      <label className={checkboxStyles['checkbox__switch']}>
        <input type="checkbox" className={checkboxStyles['checkbox__input']}/>
        <span className={`${checkboxStyles['checkbox__slider']} ${checkboxStyles['checkbox__round']}`}></span>
      </label>
      <p className={checkboxStyles['checkbox__name']}>Короткометражки</p>
    </div>
  )
}