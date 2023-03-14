import {AppDispatch, AppThunk} from "../../types";
import {beatfilmMoviesPath, moviesApi} from '../../../utils/constants';
import {getResponseData} from '../json-verifiction';
import {TMovieItem, TSavedMovieItem} from '../../types/data';
import {savedMoviesDataActions} from '../../state-slices/saved-movies-data';
import {errorsActions} from '../../state-slices/errors';
import {popupActions} from '../../state-slices/popup';
import UnauthorizedError from '../../exceptions/error-401-unauthorized';
import {userDataActions} from '../../state-slices/user-data';
import {signout} from './auth';

export const getSavedMoviesData = (): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(savedMoviesDataActions.getSavedMoviesData());

    return fetch(`${moviesApi}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok || res.status !== 401) {
          return res
        } else {
          throw new UnauthorizedError();
        }
      })
      .then(res => getResponseData<Array<TSavedMovieItem>>(res))
      .then(res => {
        dispatch(savedMoviesDataActions.getSavedMoviesDataSuccess(res));
      })
      .catch(error => {
        if (error instanceof UnauthorizedError) {
          dispatch(userDataActions.setIsAuthorized(false));
          dispatch(signout());
        } else {
          dispatch(savedMoviesDataActions.getSavedMoviesDataFailed({message: error.message}));
          dispatch(errorsActions.setLastError({
            error: {
              message: error.message,
            }
          }))
        }
      })
  }
}

export const saveMovie = (movie: TMovieItem): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(savedMoviesDataActions.getSavedMoviesData());

    return fetch(`${moviesApi}/movies`, {
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
        updated_at: undefined,
      })
    })
      .then(res => {
        if (res.ok || res.status !== 401) {
          return res
        } else {
          throw new UnauthorizedError();
        }
      })
      .then(res => getResponseData<TSavedMovieItem>(res))
      .then((savedMovie) => {
        return dispatch(savedMoviesDataActions.addLikedMovieToSavedMovies(savedMovie));
      })
      .catch(error => {
        if (error instanceof UnauthorizedError) {
          dispatch(userDataActions.setIsAuthorized(false));
          dispatch(signout());
        } else {
          dispatch(savedMoviesDataActions.getSavedMoviesDataFailed({message: error.message}));
          dispatch(errorsActions.setLastError({
            error: {
              message: error.message,
            }
          }))
          dispatch(popupActions.getAppErrorToOpenPopup({
            error: {
              message: error.message
            }
          }))
        }
      })
  }
}

export const deleteMovie = (id: number): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(savedMoviesDataActions.getSavedMoviesData());
    const url = `${moviesApi}/movies/${id}`
    console.log(url)

    fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok || res.status !== 401) {
          return res
        } else {
          throw new UnauthorizedError();
        }
      })
      .then(res => getResponseData<TMovieItem>(res))
      .then(() => {
        dispatch(getSavedMoviesData());
      })
      .catch(error => {
        if (error instanceof UnauthorizedError) {
          dispatch(userDataActions.setIsAuthorized(false));
          dispatch(signout());
        } else {
          dispatch(savedMoviesDataActions.getSavedMoviesDataFailed({message: error.message}));
          dispatch(errorsActions.setLastError({
            error: {
              message: error.message,
            }
          }))
        }
      })
  }
}