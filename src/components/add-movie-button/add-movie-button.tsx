import React, {FunctionComponent, useState} from 'react';

import addFilmButtonStyles from './add-movie-button.module.css';

import {ButtonView, TButtonView} from '../../services/types/props-types';
import {useAppDispatch} from '../../services/types/hooks';
import {saveMovie} from '../../services/actions/main-api';
import {savedMoviesDataActions} from '../../services/state-slices/saved-movies-data';
import {savingMovieActions} from '../../services/state-slices/saved-movie';
import {TMovieItem} from '../../services/types/data';

export const AddMovieButton: FunctionComponent<{ buttonView: TButtonView, movieToSave: TMovieItem }> = (props) => {
  // const {}

  const [buttonView, setButtonView] = useState<TButtonView>(props.buttonView);

  const dispatch = useAppDispatch();

  const handleAddMovie = () => {
    dispatch(saveMovie(props.movieToSave));
  }

  return (
    <>
      {
        buttonView === ButtonView.added
          // галочка
          ? <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_active']}`}
                    onClick={() => {
                      setButtonView(ButtonView.add)
                    }}></button>
          // "Сохранить"
          : buttonView === ButtonView.add
            ? <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_default']}`}
                      onClick={() => {
                        setButtonView(ButtonView.added);
                        handleAddMovie();
                        // dispatch(savingMovieActions.saveMovie(props.movieToSave))
                      }}>Сохранить</button>
          // крестик
            : <button className={`${addFilmButtonStyles.button} ${addFilmButtonStyles['button_delete']}`}
                      // onClick={() => {
                      // }
                      ></button>
      }
    </>
  )

}