import React, {FunctionComponent} from 'react';

import hamburgerStyles from './burger-menu-icon.module.css';

export const BurgerMenuIcon: FunctionComponent<{ onClick: (event: any) => void, isOpen: boolean, isActive: boolean }> = (props) => {
  return (
    <>
      {
        <button
          className={props.isActive
            ? `${hamburgerStyles['menu-icon']} ${hamburgerStyles['menu-icon_active']}`
            : `${hamburgerStyles['menu-icon']}`}
          onClick={props.onClick}>
          <span className={props.isActive
            ? `${hamburgerStyles['menu-icon__span']} ${hamburgerStyles['menu-icon__span_active']}`
            : `${hamburgerStyles['menu-icon__span']}`}></span>
        </button>
      }
    </>
  )
}