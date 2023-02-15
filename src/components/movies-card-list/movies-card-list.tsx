import React, {FunctionComponent, useEffect, useState} from 'react';

import {useAppDispatch, useSelector} from "../../services/types/hooks";

import moviesListStyles from './movies-card-list.module.css';

import {MoviesCard} from '../movies-card/movies-card';
import {MoreMoviesButton} from '../more-movies-button/more-movies-button';
import {convertMinutes, getMoviesToShow, getWindowWidth, isSavedMovie} from '../../utils/functions';
import {ButtonView, MoviesPageType} from '../../services/types/props-types';
import {TMovieItem, TSavedMovieItem} from '../../services/types/data';
import {filterCheckboxActions} from '../../services/state-slices/filter-checkbox';
import {popupActions} from '../../services/state-slices/popup';
import {
  COUNT_ITEMS_TO_SHOW_BIG_SCREEN,
  COUNT_ITEMS_TO_SHOW_MIDI_SCREEN,
  COUNT_ITEMS_TO_SHOW_SMALL_SCREEN,
  COUNT_MORE_ITEMS_TO_SHOW_BIG_SCREEN,
  COUNT_MORE_ITEMS_TO_SHOW_MIDI_SCREEN,
  COUNT_MORE_ITEMS_TO_SHOW_SMALL_SCREEN,
  SIZE_BIG_SCREEN, SIZE_MIDI_SCREEN
} from '../../utils/constants';

export const MoviesCardList: FunctionComponent<{
  buttonView: ButtonView,
  movies: Array<TMovieItem | TSavedMovieItem>,
  moviesPageType: MoviesPageType
}> = (props) => {
  const {filterCheckboxState} = useSelector(state => {
    return state
  });

  const [screenWidth, setScreenWidth] = useState(getWindowWidth())
  const [countItemsToShow, setCountItemsToShow] = useState<number>(0);
  const [countMoreItemsToShow, setCountMoreItemsToShow] = useState<number>(0);
  const [isEmptyMoviesBlock, setIsEmptyMoviesBlock] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  // отрисовка нужного кол-ва карточек с учетом фильтрации короткометражек
  let moviesToShow = getMoviesToShow(filterCheckboxState.isChecked, props.movies, countItemsToShow);
  const moreButtonDisabled = moviesToShow.length === props.movies.length || moviesToShow.length < countItemsToShow;

  const onClickMoreMoviesButton = () => {
    setCountItemsToShow(countItemsToShow + countMoreItemsToShow)
  }

  useEffect(() => {
    const handleScreenWidth = () => setScreenWidth(getWindowWidth())

    if (screenWidth.innerWidth >= SIZE_BIG_SCREEN) {
      setCountItemsToShow(COUNT_ITEMS_TO_SHOW_BIG_SCREEN);
      setCountMoreItemsToShow(COUNT_MORE_ITEMS_TO_SHOW_BIG_SCREEN);
    } else if (screenWidth.innerWidth < SIZE_BIG_SCREEN && screenWidth.innerWidth >= SIZE_MIDI_SCREEN) {
      setCountItemsToShow(COUNT_ITEMS_TO_SHOW_MIDI_SCREEN);
      setCountMoreItemsToShow(COUNT_MORE_ITEMS_TO_SHOW_MIDI_SCREEN);
    } else if (screenWidth.innerWidth < SIZE_MIDI_SCREEN) {
      setCountItemsToShow(COUNT_ITEMS_TO_SHOW_SMALL_SCREEN);
      setCountMoreItemsToShow(COUNT_MORE_ITEMS_TO_SHOW_SMALL_SCREEN);
    }

    window.addEventListener('resize', handleScreenWidth);
    return () => {
      window.removeEventListener('resize', handleScreenWidth);
    };
  }, [])

  useEffect(() => {
    dispatch(filterCheckboxActions.setIsMoviesToShowExist(moviesToShow.length !== 0));
    dispatch(popupActions.getLastFoundMoviesToOpenPopup(moviesToShow));
    if (!filterCheckboxState.isMoviesToShowExist) {
      setIsEmptyMoviesBlock(!isEmptyMoviesBlock);
    }
  }, [moviesToShow.length, filterCheckboxState.isMoviesToShowExist])

  return (
    <section className={moviesListStyles['movies-container']}>
      {
        isEmptyMoviesBlock &&
        <p className={moviesListStyles.text}>По Вашему запросу короткометражек нет</p>
      }
      <ul className={moviesListStyles.movies}>
        {
          moviesToShow.map((movie) => {
              const durationConversion = convertMinutes(movie.duration);
              return (
                <MoviesCard key={movie.id} name={movie.nameRU} duration={durationConversion} image={movie.image.url}
                            buttonView={props.buttonView}
                            itemToSave={movie}
                            moviePageType={props.moviesPageType}/>
              )
            }
          )
        }
      </ul>
      <MoreMoviesButton onClick={onClickMoreMoviesButton} disabled={moreButtonDisabled}/>
    </section>
  )
}