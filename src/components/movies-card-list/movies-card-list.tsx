import React, {FunctionComponent, useEffect, useState} from 'react';

import moviesListStyles from './movies-card-list.module.css';

import {tmpMoviesArray} from '../../utils/constants';
import {MoviesCard} from '../movies-card/movies-card';
import {MoreMoviesButton} from '../more-movies-button/more-movies-button';
import {Preloader} from '../preloader/preloader';
import {convertSeconds, getWindowWidth} from '../../utils/functions';
import {TButtonView} from '../../services/types/data';
import {Popup} from '../popup/popup';

export const MoviesCardList: FunctionComponent<{ buttonView: TButtonView }> = (props) => {
  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [screenWidth, setScreenWidth] = useState(getWindowWidth())
  const [itemsToShow, setItemsToShow] = useState<number>(0);
  const [moreItemsToShow, setMoreItemsToShow] = useState<number>(0);

  // const [popupIsOpen, setPopupIsOpen] = useState(true);
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const itemsToShowArray = tmpMoviesArray.slice(0, itemsToShow);

  const onClickMoreMoviesButton = () => {
    setItemsToShow(itemsToShow + moreItemsToShow)
  }

  const moreButtonDisabled = itemsToShowArray.length === tmpMoviesArray.length;

  const handleOnOpen = () => {
    setPopupIsOpen(true);
    document.body.classList.toggle(moviesListStyles['body-overlay']);
  }

  // TODO: Перенести состояние попапа в хранилище
  const handleOnClose = () => {
    setPopupIsOpen(false);
  }

  useEffect(() => {
    const handleScreenWidth = () => setScreenWidth(getWindowWidth())

    if (screenWidth.innerWidth >= 1200) {
      setItemsToShow(12);
      setMoreItemsToShow(12);
    } else if (screenWidth.innerWidth < 1200 && screenWidth.innerWidth >= 641) {
      setItemsToShow(8);
      setMoreItemsToShow(8);
    } else if (screenWidth.innerWidth < 641) {
      setItemsToShow(5);
      setMoreItemsToShow(5);
    }

    window.addEventListener('resize', handleScreenWidth);
    return () => {
      window.removeEventListener('resize', handleScreenWidth);
    };
  }, [])

  return (
    <section className={moviesListStyles['movies-wrapper']}>
      <ul className={moviesListStyles.movies}>
        {
          itemsToShowArray.map((movie, index) => {
              const durationConversion = convertSeconds(movie.duration);
              return (
                <MoviesCard key={index} name={movie.nameRU} duration={durationConversion} image={movie.image}
                            buttonView={props.buttonView}/>
              )
            }
          )
        }
      </ul>
      {
        isLoading
          ? <Preloader/>
          : <MoreMoviesButton onClick={() => onClickMoreMoviesButton()} disabled={moreButtonDisabled}/>
      }
      {
        popupIsOpen &&
        <Popup primaryText="Поиск не дал результатов" secondaryText="Попробуйте поискать другой фильм"
               onClose={handleOnClose}/>
      }
    </section>
  )
}