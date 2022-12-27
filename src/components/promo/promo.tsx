import React from "react";

import promoStyles from './promo.module.css';
import {NavTab} from '../nav-tab/nav-tab';
import {TCombinedRef} from '../../services/types/props-types';

export const Promo = (props: {refs: TCombinedRef}) => {
  return (
    <section className={promoStyles.wrapper}>
      <h1 className={promoStyles['wrapper__heading']}>Учебный проект студента факультета Веб-разработчик Плюс</h1>
      <NavTab refs={props.refs}/>
    </section>
  );
}