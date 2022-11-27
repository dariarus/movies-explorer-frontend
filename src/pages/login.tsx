import React, {FunctionComponent} from 'react';
import {CredentialsForm} from '../components/credentials-form/credentials-form';

export const Login: FunctionComponent = () => {
  return (
    <CredentialsForm formHeader="Рады видеть!" buttonName="Войти"
                     commentQuestion="Ещё не зарегистрированы?" commentLink="Регистрация" pageType="login"/>
  )
}