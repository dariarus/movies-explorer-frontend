import React, {FunctionComponent, useEffect, useState} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import {slide as Menu} from 'react-burger-menu';

import navigationStyles from './navigation.module.css';

import {THeaderNavigation} from '../../services/types/data';
import {BurgerMenuIcon} from '../burger-menu-icon/burger-menu-icon';
import {getWindowWidth} from '../../utils/functions';

export const Navigation: FunctionComponent<THeaderNavigation> = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(getWindowWidth())
  const [isBurgerButtonActive, setIsBurgerButtonActive] = useState(false)

  const history = useHistory();

  useEffect(() => {
    const handleScreenWidth = () => setScreenWidth(getWindowWidth())

    window.addEventListener('resize', handleScreenWidth);
    return () => {
      window.removeEventListener('resize', handleScreenWidth);
    };
  }, [])

  useEffect(() => {
    if (menuIsOpen) {
      setIsBurgerButtonActive(true);
      document.body.classList.add(navigationStyles['body-overlay']);
    } else {
      setIsBurgerButtonActive(false);
      document.body.classList.remove(navigationStyles['body-overlay']);
    }
  }, [menuIsOpen])

  const handleOpenMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <>
      <nav className={navigationStyles.nav}>
        {
          props.isAuthorized && screenWidth.innerWidth >= 769
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
                <button type="button" onClick={() => {
                  history.push('/profile')
                }}
                        className={`${navigationStyles['nav__button']} ${navigationStyles['nav__button_account']}`}>
                  Аккаунт
                </button>
              </div>
            </>
            : props.isAuthorized && screenWidth.innerWidth < 769
              ? <>
                <BurgerMenuIcon onClick={handleOpenMenu} isOpen={menuIsOpen} isActive={isBurgerButtonActive}/>
                <Menu right width={screenWidth.innerWidth <= 481 ? '100%' : '68%'} customBurgerIcon={false}
                      customCrossIcon={false}
                      isOpen={menuIsOpen}
                      onClose={handleOpenMenu}
                      className={navigationStyles['nav__burger-menu-wrapper']}
                      itemListClassName={navigationStyles['nav__burger-menu']}
                      overlayClassName={navigationStyles['nav__overlay']}>
                  <div className={navigationStyles['nav__burger-menu-films']}>
                    <NavLink to="/"
                             exact
                             className={`${navigationStyles['nav__burger-menu-item']} ${navigationStyles['nav__burger-menu-item_default']}`}
                             activeClassName={`${navigationStyles['nav__burger-menu-item']} ${navigationStyles['nav__burger-menu-item_active']}`}>Главная</NavLink>
                    <NavLink to="/movies"
                             exact
                             className={`${navigationStyles['nav__burger-menu-item']} ${navigationStyles['nav__burger-menu-item_default']}`}
                             activeClassName={`${navigationStyles['nav__burger-menu-item']} ${navigationStyles['nav__burger-menu-item_active']}`}>Фильмы</NavLink>
                    <NavLink to="/saved-movies"
                             exact
                             className={`${navigationStyles['nav__burger-menu-item']} ${navigationStyles['nav__burger-menu-item_default']}`}
                             activeClassName={`${navigationStyles['nav__burger-menu-item']} ${navigationStyles['nav__burger-menu-item_active']}`}>
                      Сохраненные фильмы
                    </NavLink>
                  </div>
                  <div className={navigationStyles['nav-wrapper']}>
                    <button type="button" onClick={() => {
                      history.push('/profile')
                    }}
                            className={`${navigationStyles['nav__button']} ${navigationStyles['nav__button_account']}`}>
                      Аккаунт
                    </button>
                  </div>
                </Menu>
              </>
              : <div>
                <Link to="/signup" className={navigationStyles['nav__item']}>Регистрация</Link>
                <button
                  onClick={() => {
                    history.push('/signin')
                  }}
                  className={`${navigationStyles['nav__button']} ${navigationStyles['nav__button_enter']}`}>Войти
                </button>
              </div>
        }
      </nav>
    </>
  )
}