import React, {FunctionComponent} from 'react';
import {useForm} from 'react-hook-form';

import profileStyles from './profile.module.css';

import {ProfileInput} from '../../components/profile-input/profile-input';
import {tmpAccountData} from '../../utils/constants';
import {Header} from '../../components/header/header';
import {Link} from 'react-router-dom';
import {IFormValues} from '../../services/types/data';
import profileInputStyles from '../../components/profile-input/profile-input.module.css';

export const Profile: FunctionComponent = () => {
  const {handleSubmit, register, formState: {errors}} = useForm<IFormValues>();

  const onSubmit = () => {
    console.log('форма отправлена');
  }

  return (
    <>
      <Header/>
      <section className={profileStyles.wrapper}>
        <form className={profileStyles.form} onSubmit={handleSubmit(onSubmit)}>
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
          <button type="submit" className={profileStyles['form__button']}>Редактировать</button>
        </form>
        <Link to="/" className={profileStyles.link}>Выйти из аккаунта</Link>
      </section>
    </>
  )
}