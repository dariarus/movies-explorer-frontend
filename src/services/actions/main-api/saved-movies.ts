import {AppDispatch, AppThunk} from "../../types";
import {beatfilmMoviesPath, moviesApi} from '../../../utils/constants';
import {getResponseData} from '../json-verifiction';
import {TMovieItem, TSavedMovieItem} from '../../types/data';
import {savedMoviesDataActions} from '../../state-slices/saved-movies-data';
import {savingMovieActions} from '../../state-slices/saving-movie';

export const getSavedMoviesData = (): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(savedMoviesDataActions.getSavedMoviesData());

    fetch(`${moviesApi}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => getResponseData<Array<TSavedMovieItem>>(res))
      .then(res => {
        dispatch(savedMoviesDataActions.getSavedMoviesDataSuccess(res))
      })
      .catch(error => {
        dispatch(savedMoviesDataActions.getSavedMoviesDataFailed({message: error.message}))
      })
  }
}

export const saveMovie = (movie: TMovieItem): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(savedMoviesDataActions.getSavedMoviesData());

    fetch(`${moviesApi}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...movie,
        image: {
          url: `${beatfilmMoviesPath}` + `${movie.image.url}`
        },
        thumbnail: `${beatfilmMoviesPath}` + `${movie.image.url}`,
        created_at: undefined,
        updated_at: undefined
      })
    })
      .then(res => getResponseData<TMovieItem>(res))
      .then((res) => {
        dispatch(savingMovieActions.saveMovie(res.id));
      })
      .catch(error => {
        dispatch(savedMoviesDataActions.getSavedMoviesDataFailed({message: error.message}))
      })
  }
}

export const unsaveMovie = (id: number): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(savedMoviesDataActions.getSavedMoviesData());

    fetch(`${moviesApi}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => getResponseData<TMovieItem>(res))
      .then(() => {
        dispatch(savingMovieActions.unsaveMovie(id));
      })
      .catch(error => {
        dispatch(savedMoviesDataActions.getSavedMoviesDataFailed({message: error.message}))
      })
  }
}