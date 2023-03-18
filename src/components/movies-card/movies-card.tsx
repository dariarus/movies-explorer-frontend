import React, {FunctionComponent, useEffect, useState} from 'react';

import moviesCardStyles from './movies-card.module.css';

import {TMovie} from '../../services/types/props-types';
import {MovieButton} from '../movie-button/movie-button';
import {beatfilmMoviesPath} from '../../utils/constants';
import {isSavedMovie} from '../../utils/functions';

export const MoviesCard: FunctionComponent<TMovie> = (props) => {
  return (
    <li className={moviesCardStyles.movie}>
      <a href={props.itemToSave.trailerLink} className={moviesCardStyles.link} target="_blank">
        <div className={moviesCardStyles['movie__info']}>
          <h5 className={`${moviesCardStyles['movie__text']} ${moviesCardStyles['movie__text_primary']}`}>
            {props.name}
          </h5>
          <p className={`${moviesCardStyles['movie__text']} ${moviesCardStyles['movie__text_secondary']}`}>
            {props.duration}
          </p>
        </div>
        {
          isSavedMovie(props.itemToSave)
            ? <img src={props.image} alt="Обложка фильма" className={moviesCardStyles['movie__image']}/>
            : <img src={`${beatfilmMoviesPath}` + `${props.image}`} alt="Обложка фильма"
                   className={moviesCardStyles['movie__image']}/>
        }
      </a>
      <MovieButton buttonView={props.buttonView}
                   moviePageType={props.moviePageType} movieToSave={props.itemToSave}/>
    </li>
  )
}