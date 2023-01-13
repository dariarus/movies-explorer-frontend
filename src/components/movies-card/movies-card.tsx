import React, {FunctionComponent, useState} from 'react';

import moviesCardStyles from './movies-card.module.css';

import {TMovie} from '../../services/types/props-types';
import {AddMovieButton} from '../add-movie-button/add-movie-button';
import {beatfilmMoviesPath} from '../../utils/constants';

export const MoviesCard: FunctionComponent<TMovie> = (props) => {

  return (
    <li className={moviesCardStyles.movie}>
      <div className={moviesCardStyles['movie__info']}>
        <h5 className={`${moviesCardStyles['movie__text']} ${moviesCardStyles['movie__text_primary']}`}>
          {props.name}
        </h5>
        <p className={`${moviesCardStyles['movie__text']} ${moviesCardStyles['movie__text_secondary']}`}>
          {props.duration}
        </p>
      </div>
      <img src={`${beatfilmMoviesPath}` + `${props.image}`} alt="Обложка фильма" className={moviesCardStyles['movie__image']}/>
      <AddMovieButton buttonView={props.buttonView} movieToSave={props.itemToSave}/>
    </li>
  )
}