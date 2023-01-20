import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';

import addFilmButtonStyles from './add-movie-button.module.css';

import {ButtonView, TButtonView} from '../../services/types/props-types';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {saveMovie, unsaveMovie} from '../../services/actions/main-api/saved-movies';
import {TMovieItem} from '../../services/types/data';

export const AddMovieButton: FunctionComponent<{ buttonView: TButtonView, movieToSave: TMovieItem }> = (props) => {
  const {savedMoviesDataState, savingMovieState} = useSelector((state) => {
    return state;
  })

  const [buttonView, setButtonView] = useState<TButtonView>(props.buttonView);
  const [wasSaved, setWasSaved] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedMovieItem = savingMovieState.idSavedMoviesArray.find(movieId => movieId === props.movieToSave.id);
    if (savedMovieItem) {
      setWasSaved(true);
    }
  }, [savedMoviesDataState.savedMoviesData.length])

  return (
    <>
      {
        // "Сохранить"
        buttonView === ButtonView.add
          ? <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_default']}`}
                    onClick={() => {
                      dispatch(saveMovie(props.movieToSave));
                      setButtonView(ButtonView.added);
                    }}>Сохранить</button>
          // галочка
          : buttonView === ButtonView.added && wasSaved
            ? <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_active']}`}
                      onClick={() => {
                        dispatch(unsaveMovie(props.movieToSave.id));
                        setButtonView(ButtonView.add);
                      }}></button>
            // крестик
            : <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_delete']}`}
                      onClick={() => {
                        dispatch(unsaveMovie(props.movieToSave.id));
                      }}></button>
      }
    </>
  )

}