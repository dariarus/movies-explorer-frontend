import React, {FunctionComponent, useState} from 'react';

import moviesCardStyles from './movies-card.module.css';

import {TMovie} from '../../services/types/data';

export const MoviesCard: FunctionComponent<TMovie & { buttonIsActive: boolean, onClick: () => void }> = (props) => {
  return (
    <div className={moviesCardStyles.movie}>
      <div className={moviesCardStyles['movie__info']}>
        <h5 className={moviesCardStyles['movie__text']}>{props.name}</h5>
        <p
          className={`${moviesCardStyles['movie__text']} ${moviesCardStyles['movie__text_secondary']}`}>{props.duration}</p>
      </div>
      <img src={props.image} alt="Обложка фильма" className={moviesCardStyles['movie__image']}/>
      {
        props.buttonIsActive
          ? <button className={`${moviesCardStyles.button} ${moviesCardStyles['button_active']}`}
                    onClick={props.onClick}></button>
          : <button className={`${moviesCardStyles.button} ${moviesCardStyles['button_default']}`}
                    onClick={props.onClick}>Сохранить</button>
      }
    </div>
  )
}