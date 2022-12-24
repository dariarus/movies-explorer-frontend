import React, {FunctionComponent} from 'react';
import {useHistory} from 'react-router-dom';

import notFound404Styles from './not-found-404.module.css';

export const NotFound404: FunctionComponent = () => {
  const history = useHistory();

  return (
    <section className={notFound404Styles['not-found-page']}>
      <div>
        <h2
          className={`${notFound404Styles['not-found-page__text']} ${notFound404Styles['not-found-page__text_header']}`}>404</h2>
        <p
          className={`${notFound404Styles['not-found-page__text']} ${notFound404Styles['not-found-page__text_comment']}`}>Страница
          не найдена</p>
      </div>
      <button className={notFound404Styles['not-found-page__back-button']} onClick={() => {
        history.goBack();
      }}>
        Назад
      </button>
    </section>
  )
}