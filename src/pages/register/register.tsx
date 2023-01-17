import React, {FunctionComponent} from 'react';
import {CredentialsForm} from '../../components/credentials-form/credentials-form';
import {userDataActions} from '../../services/state-slices/user-data';
import {signup} from '../../services/actions/auth';
import {useAppDispatch} from '../../services/types/hooks';

export const Register: FunctionComponent = () => {
  return (
    <CredentialsForm formHeader="Добро пожаловать!" buttonName="Зарегистрироваться"
                     commentQuestion="Уже зарегистрированы?" commentLinkPath="/signin"
                     commentLink="Войти" pageType="register"/>
  )
}