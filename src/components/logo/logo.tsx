import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';

import logo from '../../images/logo.svg';

export const Logo: FunctionComponent<{logoStyle?: string, linkStyle?: string}> = (props) => {
  return (
    <Link to="/" className={props.linkStyle}>
      <img src={logo} alt="Логотип" className={props.logoStyle}/>
    </Link>
  )
}