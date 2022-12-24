import React, {FunctionComponent} from 'react';
import {CredentialsForm} from '../../components/credentials-form/credentials-form';

export const Register: FunctionComponent = () => {
  return (
    <CredentialsForm formHeader="Добро пожаловать!" buttonName="Зарегистрироваться"
                    commentQuestion="Уже зарегистрированы?" commentLinkPath="/signin" commentLink="Войти" pageType="register"/>
  )
}