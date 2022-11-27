import React, {FunctionComponent, useState} from 'react';

import moviesCardStyles from './movies-card.module.css';

import {ButtonView, TButtonView, TMovie} from '../../services/types/data';
import {AddFilmButton} from '../add-film-button/add-film-button';

export const MoviesCard: FunctionComponent<TMovie> = (props) => {

  return (
    <div className={moviesCardStyles.movie}>
      <div className={moviesCardStyles['movie__info']}>
        <h5 className={moviesCardStyles['movie__text']}>{props.name}</h5>
        <p
          className={`${moviesCardStyles['movie__text']} ${moviesCardStyles['movie__text_secondary']}`}>{props.duration}</p>
      </div>
      <img src={props.image} alt="Обложка фильма" className={moviesCardStyles['movie__image']}/>
      <AddFilmButton buttonView={props.buttonView}/>
    </div>
  )
}