import React, {FunctionComponent} from 'react';

import navStyles from './nav-tab.module.css';

export const NavTab: FunctionComponent = () => {
  return (
    <div className={navStyles.navigation}>
      <button role="button" className={navStyles['navigation__item']}>
        <p className={navStyles['navigation__item-text']}>О проекте</p>
      </button>
      <button role="button" className={navStyles['navigation__item']}>
        <p className={navStyles['navigation__item-text']}>Технологии</p>
      </button>
      <button role="button" className={navStyles['navigation__item']}>
        <p className={navStyles['navigation__item-text']}>Студент</p>
      </button>
    </div>
  )
}
