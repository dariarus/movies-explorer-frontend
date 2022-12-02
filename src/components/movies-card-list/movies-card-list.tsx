import React, {FunctionComponent, useEffect, useState} from 'react';

import moviesListStyles from './movies-card-list.module.css';

import {tmpMoviesArray} from '../../utils/constants';
import {MoviesCard} from '../movies-card/movies-card';
import {MoreMoviesButton} from '../more-movies-button/more-movies-button';
import {Preloader} from '../preloader/preloader';
import {convertSeconds, getWindowWidth} from '../../utils/functions';
import {TButtonView} from '../../services/types/data';

export const MoviesCardList: FunctionComponent<{ buttonView: TButtonView }> = (props) => {
  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [screenWidth, setScreenWidth] = useState(getWindowWidth())
  const [itemsToShow, setItemsToShow] = useState<number>(0);
  const [moreItemsToShow, setMoreItemsToShow] = useState<number>(0);

  const itemsToShowArray = tmpMoviesArray.slice(0, itemsToShow);

  const onClickMoreMoviesButton = () => {
    setItemsToShow(itemsToShow + moreItemsToShow)
  }

  const moreButtonDisabled = itemsToShowArray.length === tmpMoviesArray.length;

  useEffect(() => {
    const handleScreenWidth = () => setScreenWidth(getWindowWidth())

    if (screenWidth.innerWidth >= 1200) {
      setItemsToShow(12);
      setMoreItemsToShow(12);
    } else if (screenWidth.innerWidth <= 768) {
      setItemsToShow(8);
      setMoreItemsToShow(8);
    }

    window.addEventListener('resize', handleScreenWidth);
    return () => {
      window.removeEventListener('resize', handleScreenWidth);
    };
  }, [])

  return (
    <section className={moviesListStyles['movies-wrapper']}>
      <div className={moviesListStyles.movies}>
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
      </div>
      {
        isLoading
          ? <Preloader/>
          : <MoreMoviesButton onClick={() => onClickMoreMoviesButton()} disabled={moreButtonDisabled}/>
      }
    </section>
  )
}