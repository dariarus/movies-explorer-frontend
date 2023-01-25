import React, {FunctionComponent} from 'react';
import {useLocation} from 'react-router-dom';

import headerStyles from './header.module.css';

import {Navigation} from '../navigation/navigation';
import {Logo} from '../logo/logo';
import {useSelector} from '../../services/types/hooks';

export const Header: FunctionComponent = () => {
  const {userDataState} = useSelector((state) => {
    return state;
  })

  const location = useLocation();

  if (location.pathname !== '/'
    && location.pathname !== '/movies'
    && location.pathname !== '/saved-movies'
    && location.pathname !== '/profile') {
    return null;
  }

  return (
    <header className={headerStyles.header}>
      <Logo/>
      <Navigation isAuthorized={userDataState.isAuthorized}/>
    </header>
  )
}