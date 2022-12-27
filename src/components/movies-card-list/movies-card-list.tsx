import React, {FunctionComponent, useEffect, useState} from 'react';

import {useAppDispatch, useSelector} from "../../services/types/hooks";

import moviesListStyles from './movies-card-list.module.css';

import {MoviesCard} from '../movies-card/movies-card';
import {MoreMoviesButton} from '../more-movies-button/more-movies-button';
import {Preloader} from '../preloader/preloader';
import {convertSeconds, getWindowWidth} from '../../utils/functions';
import {TButtonView} from '../../services/types/props-types';
import {Popup} from '../popup/popup';
import {getMoviesDataFromSideApi} from '../../services/actions/movies-api';
import {moviesDataSlice} from '../../services/state-slices/movies-data';
import {TMovieItem} from '../../services/types/data';

export const MoviesCardList: FunctionComponent<{ buttonView: TButtonView }> = (props) => {
  const {moviesDataState} = useSelector(state => {
    return state
  });

  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [screenWidth, setScreenWidth] = useState(getWindowWidth())
  const [countItemsToShow, setCountItemsToShow] = useState<number>(0);
  const [countMoreItemsToShow, setCountMoreItemsToShow] = useState<number>(0);
  const [itemsToShowArray, setItemsToShowArray] = useState<Array<TMovieItem>>([]);

  // const [popupIsOpen, setPopupIsOpen] = useState(true);
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  useEffect(() => {
    const storedFoundMovies = JSON.parse(localStorage.getItem('moviesHasBeenFound') || ''); // без пустой строки - оибка TS
    if (storedFoundMovies) {
      setItemsToShowArray(storedFoundMovies.slice(0, countItemsToShow));
    }
  }, [])

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

  const moreButtonDisabled = itemsToShowArray.length === moviesDataState.moviesData.length;

  const onClickMoreMoviesButton = () => {
    setCountItemsToShow(countItemsToShow + countMoreItemsToShow)
  }

  const handleOnOpen = () => {
    setPopupIsOpen(true);
    document.body.classList.toggle(moviesListStyles['body-overlay']);
  }

  // TODO: Перенести состояние попапа в хранилище
  const handleOnClose = () => {
    setPopupIsOpen(false);
  }

  return (
    <section className={moviesListStyles['movies-wrapper']}>
      <ul className={moviesListStyles.movies}>
        {
          itemsToShowArray.map((movie, index) => {
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
      {
        popupIsOpen &&
        <Popup primaryText="Поиск не дал результатов" secondaryText="Попробуйте поискать другой фильм"
               onClose={handleOnClose}/>
      }
    </section>
  )
}