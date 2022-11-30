import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';

import logo from '../../images/logo.svg';

export const Logo: FunctionComponent<{logoStyle?: string}> = (props) => {
  return (
    <Link to="/">
      <img src={logo} alt="Логотип" className={props.logoStyle}/>
    </Link>
  )
}