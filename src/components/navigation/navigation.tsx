import React, {FunctionComponent} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';

import navigationStyles from './navigation.module.css';

import {THeaderNavigation} from '../../services/types/data';

export const Navigation: FunctionComponent<THeaderNavigation> = (props) => {
  return (
    <nav className={navigationStyles.nav}>
      {
        props.isAuthorized
          ? <>
            <div className={navigationStyles['nav__films']}>
              <NavLink to="/movies"
                       className={`${navigationStyles['nav__item']} ${navigationStyles['nav__item_default']}`}
                       activeClassName={`${navigationStyles['nav__item']} ${navigationStyles['nav__item_active']}`}>Фильмы</NavLink>
              <NavLink to="/saved-movies"
                       className={`${navigationStyles['nav__item']} ${navigationStyles['nav__item_default']} ${navigationStyles['nav__item_margin-left']}`}
                       activeClassName={`${navigationStyles['nav__item']} ${navigationStyles['nav__item_active']}`}>
                Сохраненные фильмы
              </NavLink>
            </div>
            <div className={navigationStyles['nav-wrapper']}>
              <Link to="/profile" className={navigationStyles['nav__button-link']}>
                <button type="button"
                        className={`${navigationStyles['nav__button']} ${navigationStyles['nav__button_account']}`}>
                  <p className={navigationStyles['nav__item']}>Аккаунт</p>
                  <div className={navigationStyles['nav__button-icon']}></div>
                </button>
              </Link>
            </div>
          </>
          : <div>
            <Link to="/signup" className={navigationStyles['nav__item']}>Регистрация</Link>
            <Link to="/signin" className={navigationStyles['nav__button-link']}>
              <button className={`${navigationStyles['nav__button']} ${navigationStyles['nav__button_enter']}`}>Войти
              </button>
            </Link>
          </div>
      }
    </nav>
  )
}