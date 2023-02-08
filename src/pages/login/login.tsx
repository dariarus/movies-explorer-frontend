import React, {FunctionComponent, useEffect} from 'react';
import {CredentialsForm} from '../../components/credentials-form/credentials-form';
import {Redirect, useLocation} from 'react-router-dom';
import {useSelector} from '../../services/types/hooks';

export const Login: FunctionComponent = () => {
  const {userDataState} = useSelector((state) => {
    return state;
  });

  const location: { state: { from: Location } } = useLocation();

  if (userDataState.isAuthorized) {
    return (
      <Redirect
        to={location.state?.from || '/movies'}
      />
    );
  }

  return (
    <CredentialsForm formHeader="Рады видеть!" buttonName="Войти"
                     commentQuestion="Ещё не зарегистрированы?" commentLinkPath="/signup" commentLink="Регистрация"
                     pageType="login"/>
  )
}