import React, {FunctionComponent} from "react";

import promoStyles from './promo.module.css';

export const Promo: FunctionComponent = () => {
  return (
    <div className={promoStyles.wrapper}>
      <h1 className={promoStyles['wrapper__heading']}>Учебный проект студента факультета Веб-разработчик Плюс</h1>
      <div className={promoStyles['promo-navigation']}>
        <button role="button" className={promoStyles['promo-navigation__item']}>
          <p className={promoStyles['promo-navigation__item-text']}>О проекте</p>
        </button>
        <button role="button" className={promoStyles['promo-navigation__item']}>
          <p className={promoStyles['promo-navigation__item-text']}>Технологии</p>
        </button>
        <button role="button" className={promoStyles['promo-navigation__item']}>
          <p className={promoStyles['promo-navigation__item-text']}>Студент</p>
        </button>
      </div>
    </div>
  );
}