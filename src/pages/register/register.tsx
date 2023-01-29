import React, {FunctionComponent} from 'react';
import {CredentialsForm} from '../../components/credentials-form/credentials-form';
import {userDataActions} from '../../services/state-slices/user-data';
import {signup} from '../../services/actions/main-api/auth';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;
import {Redirect, useLocation} from 'react-router-dom';

export const Register: FunctionComponent = () => {
  const {userDataState} = useSelector((state) => {
    return state;
  });

  const location: { state: { from: Location } } = useLocation();

  if (userDataState.isAuthorized) {
    return (
      <Redirect
        to={location.state?.from || '/'}
      />
    );
  }

  return (
    <CredentialsForm formHeader="Добро пожаловать!" buttonName="Зарегистрироваться"
                     commentQuestion="Уже зарегистрированы?" commentLinkPath="/signin"
                     commentLink="Войти" pageType="register"/>
  )
}