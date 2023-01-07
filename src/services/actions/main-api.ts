import {AppDispatch, AppThunk} from "../types";
import {moviesDataActions} from '../state-slices/movies-data';
import {moviesApi} from '../../utils/constants';
import {getResponseData} from './json-verifiction';
import {TMovieItem} from '../types/data';

export const getSavedMoviesData = (): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(moviesDataActions.getMoviesData());

    fetch(`${moviesApi}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => getResponseData<Array<TMovieItem>>(res))
      .then(res => {
        dispatch(moviesDataActions.getMoviesDataSuccess(res))
      })
      .catch(error => {
        dispatch(moviesDataActions.getMoviesDataFailed({message: error.message}))
      })
  }
}

// export const saveMovie = (): AppThunk => {
//   return function (dispatch: AppDispatch) {
//
//     dispatch(moviesDataActions.getMoviesData());
//
//     fetch(`${moviesApi}/movies`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(res => getResponseData<Array<TMovieItem>>(res))
//       .then(res => {
//         dispatch(moviesDataActions.getMoviesDataSuccess(res))
//       })
//       .catch(error => {
//         dispatch(moviesDataActions.getMoviesDataFailed({message: error.message}))
//       })
//   }
// }