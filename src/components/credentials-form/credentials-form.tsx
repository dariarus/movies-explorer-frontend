import React, {FunctionComponent, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

import credentialsFormStyles from './credentials-form.module.css';

import {Input} from '../input/input';
import {IFormInputs, TCredentialsForm} from '../../services/types/props-types';
import {FormButton} from '../form-button/form-button';
import {Logo} from '../logo/logo';
import {Link} from 'react-router-dom';
import {tmpAccountData} from '../../utils/constants';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {signin, signup} from '../../services/actions/auth';

export const CredentialsForm: FunctionComponent<TCredentialsForm & { pageType: 'register' | 'login' }> = (props) => {
  const {inputValuesState} = useSelector((state) => {
    return state;
  })

  const {register, handleSubmit, formState: {errors}} = useForm<IFormInputs>({
    mode: 'all',
    reValidateMode: 'onChange'
  });

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    if (props.pageType === 'register'
      && (inputValuesState.inputValues.email || inputValuesState.inputValues.password || inputValuesState.inputValues.name)) {
      dispatch(signup(inputValuesState.inputValues.email, inputValuesState.inputValues.password, inputValuesState.inputValues.name))
    } else {
      dispatch(signin(inputValuesState.inputValues.email, inputValuesState.inputValues.password))
    }
  }

  return (
    <div className={credentialsFormStyles['form-wrapper']}>
      <form className={credentialsFormStyles.form}>
        <Logo logoStyle={credentialsFormStyles['form__logo']} linkStyle={credentialsFormStyles['form__logo-link']}/>
        <h3 className={credentialsFormStyles['form__header']}>{props.formHeader}</h3>
        <div className={credentialsFormStyles['form-wrapper__input-wrapper']}>
          <div>
            {
              props.pageType === 'register' &&
              <Input label="Имя" autocomplete="name" type="text" inputName="name" isLastOfType={false}
                     registerInput={register} required
                     errors={errors}/>
            }
            <Input label="E-mail" autocomplete="email" type="text" inputName="email" isLastOfType={false}
                   registerInput={register} required
                   errors={errors}/>
            <Input label="Пароль" autocomplete="new-password" type="password" inputName="password" isLastOfType={true}
                   registerInput={register}
                   required errors={errors}/>
          </div>
          <FormButton name={props.buttonName} disabled={
            errors.name || errors.email || errors.password
              ? true
              : false
          } needSearchMod={false} onClick={handleSubmit(onSubmit)}/>
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