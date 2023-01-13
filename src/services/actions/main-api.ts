import {AppDispatch, AppThunk} from "../types";
import {moviesApi} from '../../utils/constants';
import {getResponseData} from './json-verifiction';
import {TMovieItem, TSavedMovieItem} from '../types/data';
import {savedMoviesDataActions} from '../state-slices/saved-movies-data';

export const getSavedMoviesData = (): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(savedMoviesDataActions.getSavedMoviesData());

    fetch(`${moviesApi}/movies`, {
      method: 'GET',
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
      .then(res => getResponseData<Array<TMovieItem>>(res))
      // .then(res => {
      //   dispatch(savedMoviesDataActions.getMoviesDataSuccess(res))
      // })
      .catch(error => {
        dispatch(savedMoviesDataActions.getSavedMoviesDataFailed({message: error.message}))
      })
  }
}