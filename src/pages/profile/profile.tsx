import React, {FunctionComponent} from 'react';
import {useForm, Controller} from 'react-hook-form';

import profileStyles from './profile.module.css';

import {ProfileInput} from '../../components/profile-input/profile-input';
import {Link} from 'react-router-dom';
import {IFormInputs} from '../../services/types/props-types';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {updateUserData} from '../../services/actions/main-api/user';
import {inputValuesActions} from '../../services/state-slices/input-values';
import {ErrorType} from '../../services/types/data';
import {Preloader} from '../../components/preloader/preloader';
import {signout} from '../../services/actions/main-api/auth';

export const Profile: FunctionComponent = () => {
  const {userDataState, inputValuesState} = useSelector((state) => {
    return state;
  })

  const {handleSubmit, control, register, formState: {errors}} = useForm<IFormInputs>({
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();

  const updatingNameValue = inputValuesState.inputValues.name ? inputValuesState.inputValues.name : userDataState.userData.name;
  const updatingEmailValue = inputValuesState.inputValues.email ? inputValuesState.inputValues.email : userDataState.userData.email;

  const onSubmit = () => {
    dispatch(updateUserData(updatingNameValue, updatingEmailValue));
    dispatch(inputValuesActions.clearInputValuesState());
  }

  return (
    <>
      <section className={profileStyles.wrapper}>
        <form className={profileStyles.form}>
          <h3 className={profileStyles['form__header']}>{`Привет, ${userDataState.userData.name}!`}</h3>
          <div className={profileStyles['form__input-wrapper']}>
            <Controller
              control={control}
              name="name"
              render={({
                         field: {onChange, onBlur, value, name, ref},
                         fieldState: {invalid, isTouched, isDirty, error},
                         formState,
                       }) => (
                <ProfileInput label="Имя" inputName="name" isLastOfType={false} value={userDataState.userData.name}
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
              name="name"
              render={({
                         field: {onChange, onBlur, value, name, ref},
                         fieldState: {invalid, isTouched, isDirty, error},
                         formState,
                       }) => (
                <ProfileInput label="E-mail" inputName="email" isLastOfType={true} value={userDataState.userData.email}
                              registerInput={register} required errors={errors} isDisabled={userDataState.isLoading}
                              onChange={(value: string) => {
                                console.log({value})
                                onChange(value)
                              }}
                />
              )}
            />
            {
              userDataState.isLoading &&
              <Preloader/>
            }
            {
              errors.name
                ? <p className={profileStyles['form__error-message']}>{errors.name?.message}</p>
                : <p className={profileStyles['form__error-message']}>{errors.email?.message}</p>
            }
            {
              userDataState.hasError && userDataState.error.type === ErrorType.UPDATE &&
              <p
                className={`${profileStyles['change-response-notification']} ${profileStyles['change-response-notification_error']}`}>
                {`${userDataState.error.message}. Повторите попытку`}
              </p>
            }
            {
              userDataState.updateIsSuccess && !userDataState.isLoading && !userDataState.hasError &&
              <p
                className={`${profileStyles['change-response-notification']} ${profileStyles['change-response-notification_success']}`}>
                Данные успешно изменены
              </p>
            }
          </div>

          <button type="submit" disabled={errors.name
          || errors.email
          || (updatingNameValue === userDataState.userData.name
            && updatingEmailValue === userDataState.userData.email)
          || userDataState.isLoading
            ? true
            : false}
                  className={profileStyles['form__button']}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSubmit(onSubmit)()
                  }}>
            Редактировать
          </button>
        </form>

        <Link to="/" className={profileStyles.link} onClick={() => {
          dispatch(signout());
        }}>Выйти из аккаунта</Link>

      </section>
    </>
  )
}