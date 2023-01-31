import React, {FunctionComponent, useEffect, useState} from 'react';

import addFilmButtonStyles from './add-movie-button.module.css';

import {ButtonView, MoviesPageType} from '../../services/types/props-types';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {saveMovie, deleteMovie} from '../../services/actions/main-api/saved-movies';
import {TMovieButton, TMovieItem, TSavedMovieItem} from '../../services/types/data';
import {isSavedMovie} from '../../utils/functions';

export const MovieButton: FunctionComponent<TMovieButton> = (props) => {
  const {moviesDataState, savedMoviesDataState} = useSelector((state) => {
    return state;
  })

  const [buttonView, setButtonView] = useState<ButtonView>(props.buttonView);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (savedMoviesDataState.savedMoviesData.indexOf(props.movieToSave as TSavedMovieItem) > -1) {
      setButtonView(ButtonView.ADDED);
    }
  }, [])

  return (
    <>
      {
        // "Сохранить"
        buttonView === ButtonView.ADD
          ? <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_default']}`}
                    onClick={(e) => {
                      dispatch(saveMovie(props.movieToSave));
                      setButtonView(ButtonView.ADDED);
                    }}>Сохранить</button>
          // галочка
          : buttonView === ButtonView.ADDED && props.moviePageType === MoviesPageType.MOVIES
            ? <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_active']}`}
                      onClick={() => {
                        moviesDataState.moviesData.find(movie => movie.id === props.movieToSave.id)
                        dispatch(deleteMovie(props.uniqueMovieId));
                        setButtonView(ButtonView.ADD);
                      }}></button>
            // крестик
            : isSavedMovie(props.movieToSave) && props.moviePageType === MoviesPageType.SAVED_MOVIES
            && <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_delete']}`}
                       onClick={() => {
                         dispatch(deleteMovie((props.movieToSave as TSavedMovieItem)._id));
                       }}></button>
      }
    </>
  )
}