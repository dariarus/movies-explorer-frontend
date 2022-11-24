import React, {FunctionComponent, ReactEventHandler, useState} from 'react';

import moviesListStyles from './movies-card-list.module.css';

import {tmpMoviesArray} from '../../utils/constants';
import {MoviesCard} from '../movies-card/movies-card';
import {MoreMoviesButton} from '../more-button/more-movies-button';

export const MoviesCardList: FunctionComponent = () => {
  // const [buttonIsActive, setButtonIsActive] = useState<boolean>(true);
  const [buttonIsActive, setButtonIsActive] = useState<boolean>(false);

  return (
    <section className={moviesListStyles['movies-wrapper']}>
      <div className={moviesListStyles.movies}>
        {
          tmpMoviesArray.map((movie, index) =>
            <MoviesCard key={index} name={movie.nameRU} duration={movie.duration} image={movie.image}
                        buttonIsActive={buttonIsActive} onClick={() => {
              setButtonIsActive(!buttonIsActive);
            }}/>
          )
        }
      </div>
      <MoreMoviesButton/>
    </section>
  )
}