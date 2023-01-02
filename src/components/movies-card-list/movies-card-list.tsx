import React, {FunctionComponent, useEffect, useState} from 'react';

import {useSelector} from "../../services/types/hooks";

import moviesListStyles from './movies-card-list.module.css';

import {MoviesCard} from '../movies-card/movies-card';
import {MoreMoviesButton} from '../more-movies-button/more-movies-button';
import {convertSeconds, getWindowWidth} from '../../utils/functions';
import {TButtonView} from '../../services/types/props-types';
import {Popup} from '../popup/popup';
import {TMovieItem} from '../../services/types/data';
import {Preloader} from '../preloader/preloader';

export const MoviesCardList: FunctionComponent<{ buttonView: TButtonView, movies: Array<TMovieItem> }> = (props) => {
  const {moviesDataState, searchFormState} = useSelector(state => {
    return state
  });

  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [screenWidth, setScreenWidth] = useState(getWindowWidth())
  const [countItemsToShow, setCountItemsToShow] = useState<number>(0);
  const [countMoreItemsToShow, setCountMoreItemsToShow] = useState<number>(0);

  useEffect(() => {
    const handleScreenWidth = () => setScreenWidth(getWindowWidth())

    if (screenWidth.innerWidth >= 1200) {
      setCountItemsToShow(12);
      setCountMoreItemsToShow(3);
    } else if (screenWidth.innerWidth < 1200 && screenWidth.innerWidth >= 641) {
      setCountItemsToShow(8);
      setCountMoreItemsToShow(2);
    } else if (screenWidth.innerWidth < 641) {
      setCountItemsToShow(5);
      setCountMoreItemsToShow(2);
    }

    window.addEventListener('resize', handleScreenWidth);
    return () => {
      window.removeEventListener('resize', handleScreenWidth);
    };
  }, [])

  const moreButtonDisabled = props.movies.length === moviesDataState.moviesData.length;

  const onClickMoreMoviesButton = () => {
    setCountItemsToShow(countItemsToShow + countMoreItemsToShow)
  }

  return (
    <section className={moviesListStyles['movies-wrapper']}>
      <ul className={moviesListStyles.movies}>
        {
          props.movies.map((movie, index) => {
              const durationConversion = convertSeconds(movie.duration);
              return (
                <MoviesCard key={index} name={movie.nameRU} duration={durationConversion} image={movie.image.url}
                            buttonView={props.buttonView}/>
              )
            }
          )
        }
      </ul>
      <MoreMoviesButton onClick={() => onClickMoreMoviesButton()} disabled={moreButtonDisabled}/>
    </section>
  )
}