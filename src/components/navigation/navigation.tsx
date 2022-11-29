import React, {FunctionComponent} from 'react';

import navigationStyles from './navigation.module.css';

import {THeaderNavigation} from '../../services/types/data';

export const Navigation: FunctionComponent<THeaderNavigation> = (props) => {
  return (
    <nav className={navigationStyles.nav}>
      {
        props.isAuthorized
          ? <>
            <div className={navigationStyles['nav__films']}>
              <a href="#" className={navigationStyles['nav__item']}>Фильмы</a>
              <a href="#" className={`${navigationStyles['nav__item']} ${navigationStyles['nav__item_margin-left']}`}>Сохраненные фильмы</a>
            </div>
            <div className={navigationStyles['nav-wrapper']}>
              <button className={`${navigationStyles['nav__button']} ${navigationStyles['nav__button_account']}`}>
                <p className={navigationStyles['nav__item']}>Аккаунт</p>
                <div className={navigationStyles['nav__button-icon']}></div>
              </button>
            </div>
          </>
          : <div>
            <a href="#" className={navigationStyles['nav__item']}>Регистрация</a>
            <button className={`${navigationStyles['nav__button']} ${navigationStyles['nav__button_enter']}`}>Войти</button>
          </div>
      }
    </nav>
  )
}