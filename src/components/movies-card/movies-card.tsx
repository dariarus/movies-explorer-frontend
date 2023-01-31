import React, {FunctionComponent, useEffect, useState} from 'react';

import moviesCardStyles from './movies-card.module.css';

import {TMovie} from '../../services/types/props-types';
import {MovieButton} from '../add-movie-button/movie-button';
import {beatfilmMoviesPath} from '../../utils/constants';
import {isSavedMovie} from '../../utils/functions';
import {useSelector} from '../../services/types/hooks';
import {TSavedMovieItem} from '../../services/types/data';

export const MoviesCard: FunctionComponent<TMovie> = (props) => {
  const {moviesDataState, savedMoviesDataState} = useSelector((state) => {
    return state;
  })

  const [uniqueMovieId, setUniqueMovieId] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    // moviesDataState.moviesData.map((movie) => {
      const savedMovie = savedMoviesDataState.savedMoviesData.find((savedMovie) => {
        return props.itemToSave.id === savedMovie.id
      })
      if (savedMovie) {
        setUniqueMovieId(savedMovie._id);
        // setIsSaved(true);
      }
  }, [moviesDataState.moviesData, savedMoviesDataState.savedMoviesData])

  useEffect(() => {
    //
    //   props.itemToSave: {
    //     ...props.itemToSave,
    //     isSaved: true
    //   }
    // }
  }, [])

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
      {
        isSavedMovie(props.itemToSave)
          ? <img src={props.image} alt="Обложка фильма" className={moviesCardStyles['movie__image']}/>
          : <img src={`${beatfilmMoviesPath}` + `${props.image}`} alt="Обложка фильма"
                 className={moviesCardStyles['movie__image']}/>
      }
      <MovieButton buttonView={props.buttonView} moviePageType={props.moviePageType} movieToSave={props.itemToSave}
                   uniqueMovieId={uniqueMovieId} isSaved={isSaved}/>
    </li>
  )
}