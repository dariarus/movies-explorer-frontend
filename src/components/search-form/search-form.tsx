import React, {FunctionComponent} from 'react';

import searchFormStyles from './search-form.module.css';

import {FormButton} from '../form-button/form-button';
import {FilterCheckbox} from '../filter-checkbox/filter-checkbox';

export const SearchForm: FunctionComponent = () => {
  return (
    <section className={searchFormStyles.wrapper}>
      <form className={searchFormStyles['search-form']}>
        <input type="text" className={searchFormStyles['search-form__input']} placeholder="Фильм" required/>
        <FormButton name="Поиск" needSearchMod={true}/>
      </form>
      <FilterCheckbox/>
      <hr className={searchFormStyles.decor}/>
    </section>
  )
}