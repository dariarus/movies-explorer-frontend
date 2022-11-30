import React, {FunctionComponent} from 'react';

import headerStyles from './header.module.css';

import {Navigation} from '../navigation/navigation';
import {Logo} from '../logo/logo';

export const Header: FunctionComponent = () => {
  // TODO: перенести авторизацию в хранилище
  return (
    <header className={headerStyles.header}>
     <Logo/>
      <Navigation isAuthorized={true}/>
      {/*<Navigation isAuthorized={false}/>*/}
    </header>
  )
}