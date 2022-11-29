import React, {FunctionComponent} from 'react';

import headerStyles from './header.module.css';
import logo from '../../images/logo.svg';

import {Navigation} from '../navigation/navigation';

export const Header: FunctionComponent = () => {
  // TODO: перенести авторизацию в хранилище
  return (
    <header className={headerStyles.header}>
      <img src={logo} alt="Логотип"/>
      {/*<Navigation isAuthorized={true}/>*/}
      <Navigation isAuthorized={false}/>
    </header>
  )
}