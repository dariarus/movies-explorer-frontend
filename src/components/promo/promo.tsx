import React, {FunctionComponent} from "react";

import promoStyles from './promo.module.css';
import {NavTab} from '../nav-tab/nav-tab';

export const Promo = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section className={promoStyles.wrapper}>
      <h1 className={promoStyles['wrapper__heading']}>Учебный проект студента факультета Веб-разработчик Плюс</h1>
      <NavTab ref={ref}/>
    </section>
  );
})