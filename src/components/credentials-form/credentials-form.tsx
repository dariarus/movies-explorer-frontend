import React, {FunctionComponent} from 'react';

import credentialsFormStyles from './credentials-form.module.css';

import {Input} from '../input/input';
import {TCredentialsForm} from '../../services/types/data';
import {FormButton} from '../form-button/form-button';
import {Logo} from '../logo/logo';
import {Link} from 'react-router-dom';

export const CredentialsForm: FunctionComponent<TCredentialsForm & { pageType: 'register' | 'login' }> = (props) => {
  return (
    <div className={credentialsFormStyles['form-wrapper']}>
      <form className={credentialsFormStyles.form}>
        <Logo logoStyle={credentialsFormStyles['form__logo']}/>
        <h3 className={credentialsFormStyles['form__header']}>{props.formHeader}</h3>
        <div className={credentialsFormStyles['form-wrapper__input-wrapper']}>
          <div>
            {
              props.pageType === 'register' &&
              <Input label="Имя" type="text" isLastOfType={false}/>
            }
            <Input label="E-mail" type="text" isLastOfType={false}/>
            <Input label="Пароль" type="password" isLastOfType={true}/>
          </div>
          <FormButton name={props.buttonName} needSearchMod={false}/>
        </div>
      </form>
      <div className={credentialsFormStyles['form-wrapper__text-wrapper']}>
        <p className={credentialsFormStyles['form-wrapper__text']}>{props.commentQuestion}</p>
        <Link to={props.commentLinkPath}
              className={`${credentialsFormStyles['form-wrapper__text']} ${credentialsFormStyles['form-wrapper__text_link']}`}>
          {props.commentLink}
        </Link>
      </div>
    </div>
  )
}