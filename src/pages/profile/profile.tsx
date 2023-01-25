import React, {FunctionComponent} from 'react';
import {useForm} from 'react-hook-form';

import profileStyles from './profile.module.css';

import {ProfileInput} from '../../components/profile-input/profile-input';
import {tmpAccountData} from '../../utils/constants';
import {Link} from 'react-router-dom';
import {IFormInputs} from '../../services/types/props-types';
import {useAppDispatch} from '../../services/types/hooks';

export const Profile: FunctionComponent = () => {
  const {handleSubmit, register, formState: {errors}} = useForm<IFormInputs>();

  const dispatch = useAppDispatch();

  const onSubmit = () => {
   console.log('okok')
  }

  //TODO: вставить настоящего юзера на вывод вместо временного
  return (
    <>
      <section className={profileStyles.wrapper}>
        <form className={profileStyles.form}>
          <h3 className={profileStyles['form__header']}>{`Привет, ${tmpAccountData.name}!`}</h3>
          <div className={profileStyles['form__input-wrapper']}>
            <ProfileInput label="Имя" inputName="name" isLastOfType={false} value={tmpAccountData.name}
                          registerInput={register} required errors={errors}/>
            <ProfileInput label="E-mail" inputName="email" isLastOfType={true} value={tmpAccountData.email}
                          registerInput={register} required errors={errors}/>
            {
              errors.name
                ? <p className={profileStyles['form__error-message']}>{errors.name?.message}</p>
                : <p className={profileStyles['form__error-message']}>{errors.email?.message}</p>
            }
          </div>
          <button type="submit" className={profileStyles['form__button']}
                  onClick={handleSubmit(onSubmit)}>
            Редактировать
          </button>
        </form>
        <Link to="/" className={profileStyles.link}>Выйти из аккаунта</Link>
      </section>
    </>
  )
}