import React, {FunctionComponent} from 'react';

import profileStyles from './profile.module.css';

import {ProfileInput} from '../../components/profile-input/profile-input';
import {tmpAccountData} from '../../utils/constants';

export const Profile: FunctionComponent = () => {
  return (
    <section className={profileStyles.wrapper}>
      <form className={profileStyles.form}>
        <h3 className={profileStyles['form__header']}>{`Привет, ${tmpAccountData.name}!`}</h3>
        <div className={profileStyles['form__input-wrapper']}>
          <ProfileInput label="Имя" isLastOfType={false} value={tmpAccountData.name}/>
          <ProfileInput label="E-mail" isLastOfType={true} value={tmpAccountData.email}/>
        </div>
        <button type="submit" className={profileStyles['form__button']}>Редактировать</button>
      </form>
      <a href='#' className={profileStyles.link}>Выйти из аккаунта</a>
    </section>


  )
}