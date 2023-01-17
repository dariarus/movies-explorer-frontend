import React, {FunctionComponent} from 'react';
import {useLocation} from 'react-router-dom';

import headerStyles from './header.module.css';

import {Navigation} from '../navigation/navigation';
import {Logo} from '../logo/logo';

export const Header: FunctionComponent = () => {
  const location = useLocation();

  if (location.pathname !== '/'
    && location.pathname !== '/movies'
    && location.pathname !== '/saved-movies'
    && location.pathname !== '/profile') {
    return null;
  }

  // TODO: перенести авторизацию в хранилище
  return (
    <header className={headerStyles.header}>
      <Logo/>
      {/*<Navigation isAuthorized={true}/>*/}
      <Navigation isAuthorized={false}/>
    </header>
  )
}