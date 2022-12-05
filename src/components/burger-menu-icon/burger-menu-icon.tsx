import React, {FunctionComponent} from 'react';
import Hamburger, {BurgerProps, RenderOptions} from 'hamburger-react';

import hamburgerStyles from './burger-menu-icon-2.module.css';

export const BurgerMenuIcon: FunctionComponent<{ onClick: (event: any) => void, isOpen: boolean, isActive: boolean }> = (props) => {
  return (
    <>
      {
        // props.isOpen
        // ? <button className={hamburgerStyles['header__icon_close-icon']} onClick={props.onClick}>
        //   <span className={hamburgerStyles['header__icon-span']}></span>
        // </button>
        <button
          className={props.isActive ? `${hamburgerStyles['menu-icon']} ${hamburgerStyles['menu-icon_active']}` : `${hamburgerStyles['menu-icon']}`}
          onClick={props.onClick}>
          <span className={props.isActive ? `${hamburgerStyles['menu-icon__span_active']}` : `${hamburgerStyles['menu-icon__span']}`}></span>
        </button>
      }
    </>
  )
}