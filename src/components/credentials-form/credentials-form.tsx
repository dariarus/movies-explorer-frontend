import React, {FunctionComponent} from 'react';
import {useForm} from 'react-hook-form';

import credentialsFormStyles from './credentials-form.module.css';

import {Input} from '../input/input';
import {IFormValues, TCredentialsForm} from '../../services/types/data';
import {FormButton} from '../form-button/form-button';
import {Logo} from '../logo/logo';
import {Link} from 'react-router-dom';
import {tmpAccountData} from '../../utils/constants';

export const CredentialsForm: FunctionComponent<TCredentialsForm & { pageType: 'register' | 'login' }> = (props) => {

  const {register, handleSubmit, formState: {errors}} = useForm<IFormValues>();

  const onSubmit = () => {
    console.log('форма отправлена');
  }

  return (
    <div className={credentialsFormStyles['form-wrapper']}>
      <form className={credentialsFormStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <Logo logoStyle={credentialsFormStyles['form__logo']}/>
        <h3 className={credentialsFormStyles['form__header']}>{props.formHeader}</h3>
        <div className={credentialsFormStyles['form-wrapper__input-wrapper']}>
          <div>
            {
              props.pageType === 'register' &&
              <Input label="Имя" autocomplete="your-name" type="text" inputName="name" isLastOfType={false} registerInput={register} required
                     errors={errors}/>
            }
            <Input label="E-mail" autocomplete="your-email" type="text" inputName="email" isLastOfType={false} registerInput={register} required
                   errors={errors}/>
            <Input label="Пароль" autocomplete="new-password" type="password" inputName="password" isLastOfType={true} registerInput={register}
                   required errors={errors}/>
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