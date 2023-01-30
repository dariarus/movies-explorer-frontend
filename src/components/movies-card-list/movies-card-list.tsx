import React, {FunctionComponent, useEffect, useState} from 'react';

import {useSelector} from "../../services/types/hooks";

import moviesListStyles from './movies-card-list.module.css';

import {MoviesCard} from '../movies-card/movies-card';
import {MoreMoviesButton} from '../more-movies-button/more-movies-button';
import {convertSeconds, getMoviesToShow, getWindowWidth} from '../../utils/functions';
import {TButtonView} from '../../services/types/props-types';
import {TMovieItem, TSavedMovieItem} from '../../services/types/data';

export const MoviesCardList: FunctionComponent<{
  buttonView: TButtonView,
  movies: Array<TMovieItem> | Array<TSavedMovieItem>
}> = (props) => {
  const {filterCheckboxState} = useSelector(state => {
    return state
  });

  const [screenWidth, setScreenWidth] = useState(getWindowWidth())
  const [countItemsToShow, setCountItemsToShow] = useState<number>(0);
  const [countMoreItemsToShow, setCountMoreItemsToShow] = useState<number>(0);

  // отрисовка нужного кол-ва карточек с учетом фильтрации короткометражек
  const moviesToShow = getMoviesToShow(filterCheckboxState.isChecked, props.movies, countItemsToShow);
  const moreButtonDisabled = moviesToShow.length === props.movies.length || moviesToShow.length < countItemsToShow;

  const onClickMoreMoviesButton = () => {
    setCountItemsToShow(countItemsToShow + countMoreItemsToShow)
  }

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

  return (
    <section className={moviesListStyles['movies-container']}>
      <ul className={moviesListStyles.movies}>
        {
          moviesToShow.map((movie, index) => {
              const durationConversion = convertSeconds(movie.duration);
              return (
                <MoviesCard key={movie.id} itemToSave={movie} name={movie.nameRU} duration={durationConversion} image={movie.image.url}
                            buttonView={props.buttonView}/>
              )
            }
          )
        }
      </ul>
      <MoreMoviesButton onClick={onClickMoreMoviesButton} disabled={moreButtonDisabled}/>
    </section>
  )
}