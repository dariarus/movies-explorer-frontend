import React, {FunctionComponent} from 'react';
import {useForm, Controller} from 'react-hook-form';

import credentialsFormStyles from './credentials-form.module.css';

import {Input} from '../input/input';
import {IFormInputs, TCredentialsForm} from '../../services/types/props-types';
import {FormButton} from '../form-button/form-button';
import {Logo} from '../logo/logo';
import {Link} from 'react-router-dom';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {signin, signup} from '../../services/actions/main-api/auth';
import {inputValuesActions} from '../../services/state-slices/input-values';
import {getUser} from '../../services/actions/main-api/user';

export const CredentialsForm: FunctionComponent<TCredentialsForm & { pageType: 'register' | 'login' }> = (props) => {
  const {userDataState, inputValuesState} = useSelector((state) => {
    return state;
  })

  const {register, control, handleSubmit, formState: {errors}} = useForm<IFormInputs>({
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();

  const onSubmit = () => {
    if (inputValuesState.inputValues.email || inputValuesState.inputValues.password || inputValuesState.inputValues.name) {
      if (props.pageType === 'register') {
        Promise.resolve(
          dispatch(signup(
            inputValuesState.inputValues.name,
            inputValuesState.inputValues.email,
            inputValuesState.inputValues.password
          ))
        )
          .then(() => dispatch(inputValuesActions.clearInputValuesState()))
      } else {
        Promise.resolve(dispatch(signin(inputValuesState.inputValues.email, inputValuesState.inputValues.password)))
          .then(() => {
            dispatch(getUser());
            dispatch(inputValuesActions.clearInputValuesState())
          });
      }
    }

  }

  console.log(inputValuesState.inputValues)

  return (
    <div className={credentialsFormStyles['form-wrapper']}>
      <form className={credentialsFormStyles.form}>
        <Logo logoStyle={credentialsFormStyles['form__logo']} linkStyle={credentialsFormStyles['form__logo-link']}/>
        <h3 className={credentialsFormStyles['form__header']}>{props.formHeader}</h3>
        <div className={credentialsFormStyles['form-wrapper__input-wrapper']}>
          <div>
            {
              props.pageType === 'register' &&
              <Controller
                control={control}
                name="name"
                render={({
                           field: {onChange, onBlur, value, name, ref},
                           fieldState: {invalid, isTouched, isDirty, error},
                           formState,
                         }) => (
                  <Input label="Имя" autocomplete="name" type="text" inputName="name" isLastOfType={false}
                         registerInput={register} required errors={errors} isDisabled={userDataState.isLoading}
                         onChange={(value: string) => {
                           console.log({value})
                           onChange(value)
                         }}
                  />
                )}
              />
            }
            <Controller
              control={control}
              name="email"
              render={({
                         field: {onChange, onBlur, value, name, ref},
                         fieldState: {invalid, isTouched, isDirty, error},
                         formState,
                       }) => (
                <Input label="E-mail" autocomplete="email" type="text" inputName="email" isLastOfType={false}
                       registerInput={register} required errors={errors} isDisabled={userDataState.isLoading}
                       onChange={(value: string) => {
                         console.log({value})
                         onChange(value)
                       }}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({
                         field: {onChange, onBlur, value, name, ref},
                         fieldState: {invalid, isTouched, isDirty, error},
                         formState,
                       }) => (
                <Input label="Пароль" autocomplete="new-password" type="password" inputName="password"
                       isLastOfType={true} registerInput={register} required errors={errors}
                       isDisabled={userDataState.isLoading}
                       onChange={(value: string) => {
                         console.log({value})
                         onChange(value)
                       }}
                />
              )}
            />
          </div>
          <FormButton name={props.buttonName} disabled={
            Object.keys(inputValuesState.inputValues).length === 0 ||
            (errors.name || errors.email || errors.password) || userDataState.isLoading
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