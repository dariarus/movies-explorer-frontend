import React, {FunctionComponent} from 'react';

import burgerStyles from './menu-burger.module.css';

import {Overlay} from '../overlay/overlay';
import {TBurgerMenu} from '../../services/types/data';

export const MenuBurger: FunctionComponent<TBurgerMenu> = (props) => {
  return (
    <>
      {
        props.menuIsOpen &&
        <Overlay onClose={props.onClose}/>
      }
      <div className={props.menuIsOpen
        ? `${burgerStyles['menu-body']} ${burgerStyles['menu-body_opened']}`
        : `${burgerStyles['menu-body']}`}>
        {props.children}
      </div>
    </>
  )
}