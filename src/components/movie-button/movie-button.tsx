import React, {FunctionComponent} from 'react';

import filmButtonStyles from './movie-button.module.css';

import {ButtonView} from '../../services/types/props-types';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {TMovieButton} from '../../services/types/data';
import {isSavedMovie} from '../../utils/functions';
import {deleteMovie, saveMovie} from '../../services/actions/main-api/saved-movies';
import {savedMoviesDataActions} from '../../services/state-slices/saved-movies-data';

export const MovieButton: FunctionComponent<TMovieButton> = (props) => {
  const {savedMoviesDataState} = useSelector((state) => {
    return state;
  })

  const dispatch = useAppDispatch();

  return (
    <>
      {
        // галочка
        props.buttonView === ButtonView.ADD
          ? savedMoviesDataState.savedMoviesData.find((movie) => movie.id === props.movieToSave.id)
            ? <button className={`${filmButtonStyles.button} ${filmButtonStyles['button_active']}`}
                      onClick={() => {
                        dispatch(deleteMovie(props.movieToSave.id));
                        dispatch(savedMoviesDataActions.deleteLastFoundSavedMovie(props.movieToSave.id))
                      }}></button>
            // "Сохранить"
            : <button className={`${filmButtonStyles.button} ${filmButtonStyles['button_default']}`}
                      onClick={() => {
                        dispatch(saveMovie(props.movieToSave));
                      }}>Сохранить</button>
          // крестик
          : isSavedMovie(props.movieToSave)
          && <button className={`${filmButtonStyles.button} ${filmButtonStyles['button_delete']}`}
                     onClick={() => {
                       dispatch(deleteMovie(props.movieToSave.id));
                       dispatch(savedMoviesDataActions.deleteLastFoundSavedMovie(props.movieToSave.id))
                     }}></button>
      }
    </>
  )
}