import React, {FunctionComponent, useState} from 'react';

import moviesListStyles from './movies-card-list.module.css';

import {tmpMoviesArray} from '../../utils/constants';
import {MoviesCard} from '../movies-card/movies-card';
import {MoreMoviesButton} from '../more-movies-button/more-movies-button';
import {Preloader} from '../preloader/preloader';
import {convertSeconds} from '../../utils/functions';

export const MoviesCardList: FunctionComponent = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)


  return (
    <section className={moviesListStyles['movies-wrapper']}>
      <div className={moviesListStyles.movies}>
        {
          tmpMoviesArray.map((movie, index) => {
              const durationConversion = convertSeconds(movie.duration);
              return (
                <MoviesCard key={index} name={movie.nameRU} duration={durationConversion} image={movie.image}/>
              )
            }
          )
        }
      </div>
      {
        isLoading
          ? <Preloader/>
          : <MoreMoviesButton/>
      }
    </section>
  )
}