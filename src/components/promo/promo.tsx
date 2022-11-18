import React, {FunctionComponent} from "react";

import promoStyles from './promo.module.css';
import {NavTab} from '../nav-tab/nav-tab';

export const Promo: FunctionComponent = () => {
  return (
    <section className={promoStyles.wrapper}>
      <h1 className={promoStyles['wrapper__heading']}>Учебный проект студента факультета Веб-разработчик Плюс</h1>
      <NavTab />
    </section>
  );
}